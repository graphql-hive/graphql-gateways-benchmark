// Generates the large (ecommerce) supergraph used by the `planning-large`
// benchmark:
//
//   large-graph/subgraphs/<name>.graphql   one Federation v2 SDL per subgraph
//   large-graph/supergraph.graphql         composed supergraph (Apollo composition)
//   large-graph/cosmo-config.json          Cosmo router execution config (wgc)
//   large-graph/queries.js                 k6 module with the benchmark queries
//
// Usage: npm run generate-large-graph
//   SUBGRAPHS=<n>   number of subgraphs to generate (default: all 80). The
//                   first CORE_SUBGRAPHS own the entities and the @requires
//                   chains and are always kept.
//   SKIP_COSMO=1    don't regenerate cosmo-config.json (needs `npx wgc`)
//
// The schema is modelled on a store whose graph grew one team at a time:
//   - wide entities: a few core entities (Product, Variant, Customer, Order,
//     Cart) that dozens of subgraphs each contribute a couple of fields to
//   - abstract types: `Product`, `Promotion` and `PaymentMethod` are interfaces
//     whose implementations are entities extended across subgraphs, plus the
//     `SearchResult` and `ContentBlock` unions
//   - @requires chains: computed fields that depend on fields computed by
//     other subgraphs, several hops deep (cart totals, product ranking, ...)
//   - @provides and a second @key (`Variant.sku`) to give planners options
//
// The subgraphs are served by the mock server in `subgraphs/ecommerce.rs`.

import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { composeServices } from "@apollo/composition";
import {
  GraphQLNamedType,
  GraphQLSchema,
  buildSchema,
  getNamedType,
  isAbstractType,
  isCompositeType,
  isInterfaceType,
  isLeafType,
  isNonNullType,
  isObjectType,
  parse,
  validate,
} from "graphql";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "large-graph");
const SUBGRAPH_URL = "http://0.0.0.0:4200/ecommerce";
const COSMO_SUBGRAPH_URL = "http://localhost:4200/ecommerce";
const WGC_VERSION = "0.133.13";

// --- Schema model ------------------------------------------------------------

// Interfaces whose implementations are entities. Contributing fields to the
// interface name adds them to the interface and to every implementation.
const GROUPS: Record<string, string[]> = {
  Product: [
    "PhysicalProduct",
    "DigitalProduct",
    "BundleProduct",
    "GiftCardProduct",
    "SubscriptionProduct",
    "ConfigurableProduct",
  ],
  Promotion: [
    "PercentageDiscount",
    "FixedAmountDiscount",
    "BuyXGetYDeal",
    "FreeShippingOffer",
    "BundleDeal",
  ],
  PaymentMethod: [
    "CreditCard",
    "PayPalAccount",
    "BankTransfer",
    "GiftCardBalance",
    "BuyNowPayLater",
  ],
};

const ENTITIES = [
  ...Object.values(GROUPS).flat(),
  "Variant",
  "Category",
  "Brand",
  "Customer",
  "Order",
  "OrderItem",
  "Cart",
  "CartItem",
  "Seller",
  "Store",
  "Warehouse",
  "Shipment",
  "Review",
];

type SubgraphSpec = {
  name: string;
  /** Root `Query` fields. */
  roots?: string[];
  /**
   * Fields contributed per entity (or per interface in GROUPS), separated by
   * `;`. `@requires(a b)` / `@provides(a b)` are expanded, and the matching
   * `@external` declarations are added automatically.
   */
  fields?: Record<string, string>;
  /** Key used for an entity in this subgraph instead of `id`. */
  keys?: Record<string, string[]>;
  /** Raw SDL for types only this subgraph knows about (value types, unions). */
  extra?: string;
};

// The first CORE_SUBGRAPHS entries own entities, root fields and the
// @requires chains. The rest only add fields to existing entities, so any
// suffix of them can be dropped with SUBGRAPHS=<n>.
const CORE_SUBGRAPHS = 38;

const SUBGRAPHS: SubgraphSpec[] = [
  // --- Entity owners ---------------------------------------------------------
  {
    name: "catalog",
    roots: ["product(id: ID!): Product", "products(first: Int = 10): [Product!]!"],
    fields: {
      Product:
        "sku: String!; name: String!; slug: String!; description: String; brand: Brand; categories: [Category!]!; variants: [Variant!]!; createdAt: String",
      PhysicalProduct: "weightGrams: Int; material: String",
      DigitalProduct: "downloadSizeMb: Int; fileFormat: String",
      BundleProduct: "bundleItems: [Product!]!",
      GiftCardProduct: "denominations: [Int!]!",
      SubscriptionProduct: "billingInterval: String; trialDays: Int",
      ConfigurableProduct: "optionNames: [String!]!",
    },
  },
  {
    name: "variants",
    keys: { Variant: ["id", "sku"] },
    fields: {
      Variant:
        "sku: String!; title: String!; color: String; size: String; position: Int; product: Product!",
    },
  },
  {
    name: "categories",
    roots: ["category(id: ID!): Category", "categories: [Category!]!"],
    fields: {
      Category:
        "name: String!; slug: String!; level: Int; parent: Category; children: [Category!]!",
    },
  },
  {
    name: "brands",
    roots: ["brand(id: ID!): Brand"],
    fields: { Brand: "name: String!; slug: String!; logoUrl: String; country: String" },
  },
  {
    name: "customers",
    roots: ["me: Customer", "customer(id: ID!): Customer"],
    fields: {
      Customer:
        "email: String!; displayName: String!; firstName: String; lastName: String; createdAt: String",
    },
  },
  {
    name: "orders",
    roots: ["order(id: ID!): Order"],
    fields: {
      Order:
        "number: String!; status: OrderStatus!; placedAt: String!; customer: Customer!; items: [OrderItem!]!",
      OrderItem:
        "quantity: Int!; unitPriceCents: Int!; variant: Variant! @provides(title); product: Product!",
      Customer: "orders(first: Int = 5): [Order!]!",
    },
    extra: `enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}`,
  },
  {
    name: "carts",
    roots: ["cart(id: ID!): Cart"],
    fields: {
      Cart: "currency: String!; updatedAt: String; customer: Customer; items: [CartItem!]!",
      CartItem: "quantity: Int!; addedAt: String; variant: Variant!; product: Product!",
      Customer: "cart: Cart",
    },
  },
  {
    name: "sellers",
    roots: ["seller(id: ID!): Seller"],
    fields: {
      Seller: "name: String!; slug: String!; rating: Float; since: String",
      Product: "seller: Seller",
    },
  },
  {
    name: "stores",
    roots: ["stores: [Store!]!"],
    fields: {
      Store:
        "name: String!; city: String; countryCode: String; latitude: Float; longitude: Float; openingHours: String",
    },
  },
  {
    name: "warehouses",
    fields: { Warehouse: "code: String!; name: String; region: String; countryCode: String" },
  },
  {
    name: "inventory",
    keys: { Variant: ["sku"] },
    fields: {
      Variant: "inStock: Boolean!; stockLevel: Int!; warehouses: [Warehouse!]!",
    },
  },
  {
    name: "pricing",
    fields: {
      Product: "listPriceCents: Int!; priceCurrency: String!",
      Variant: "listPriceCents: Int!; priceCurrency: String!",
      CartItem: "unitPriceCents: Int!",
    },
  },
  {
    name: "reviews",
    fields: {
      Review:
        "rating: Int!; title: String; body: String; createdAt: String; author: Customer! @provides(displayName); product: Product!",
      Product: "reviews(first: Int = 5): [Review!]!; ratingAverage: Float; reviewCount: Int",
      Customer: "reviews: [Review!]!",
    },
  },
  {
    name: "promotions",
    roots: ["promotions: [Promotion!]!"],
    fields: {
      Promotion:
        "code: String!; title: String!; startsAt: String; endsAt: String; stackable: Boolean",
      PercentageDiscount: "percentOff: Int!",
      FixedAmountDiscount: "amountOffCents: Int!",
      BuyXGetYDeal: "buyQuantity: Int!; getQuantity: Int!",
      FreeShippingOffer: "minimumSpendCents: Int",
      BundleDeal: "requiredItems: Int!",
      Cart: "appliedPromotions: [Promotion!]!",
      Product: "promotions: [Promotion!]!",
    },
  },
  {
    name: "payments",
    fields: {
      PaymentMethod: "label: String!; isDefault: Boolean!; addedAt: String",
      CreditCard: "last4: String!; cardBrand: String; expiryMonth: Int; expiryYear: Int",
      PayPalAccount: "payerEmail: String",
      BankTransfer: "ibanLast4: String; bankName: String",
      GiftCardBalance: "balanceCents: Int!",
      BuyNowPayLater: "installments: Int!; provider: String",
      Customer: "paymentMethods: [PaymentMethod!]!",
      Order: "paymentMethod: PaymentMethod; paymentStatus: String",
    },
  },
  {
    name: "shipments",
    fields: {
      Shipment:
        "trackingNumber: String; carrier: String; status: String; shippedAt: String; warehouse: Warehouse @provides(code)",
      Order: "shipments: [Shipment!]!",
    },
  },
  {
    name: "search",
    roots: ["search(term: String!, first: Int = 10): [SearchResult!]!"],
    extra: `union SearchResult =
  | PhysicalProduct
  | DigitalProduct
  | BundleProduct
  | GiftCardProduct
  | SubscriptionProduct
  | ConfigurableProduct
  | Category
  | Brand
  | Seller
  | Store`,
  },
  {
    name: "content",
    roots: ["page(slug: String!): Page"],
    extra: `type Page {
  slug: String!
  title: String
  blocks: [ContentBlock!]!
}

union ContentBlock =
  | HeroBanner
  | ProductCarousel
  | CategoryGrid
  | PromoBanner
  | BrandSpotlight
  | RichText

type HeroBanner {
  headline: String
  imageUrl: String
  linkUrl: String
}

type ProductCarousel {
  heading: String
  products: [Product!]!
}

type CategoryGrid {
  heading: String
  categories: [Category!]!
}

type PromoBanner {
  text: String
  promotion: Promotion
}

type BrandSpotlight {
  tagline: String
  brand: Brand
  products: [Product!]!
}

type RichText {
  html: String
}`,
  },

  // --- @requires chains: cart / checkout -------------------------------------
  {
    name: "cart-totals",
    fields: { Cart: "subtotalCents: Int!; itemCount: Int!" },
  },
  {
    name: "discounts",
    fields: {
      CartItem: "discountCents: Int! @requires(unitPriceCents quantity)",
      Cart: "discountTotalCents: Int! @requires(subtotalCents)",
    },
  },
  {
    name: "fulfillment",
    fields: {
      Variant: "shippingWeightGrams: Int; shippingClass: String",
      CartItem: "shippingWeightGrams: Int! @requires(quantity)",
    },
  },
  {
    name: "shipping-rates",
    fields: {
      CartItem: "shippingCents: Int! @requires(shippingWeightGrams quantity)",
      Cart:
        "shippingTotalCents: Int! @requires(subtotalCents discountTotalCents); shippingOptions: [ShippingOption!]!",
    },
    extra: `type ShippingOption {
  code: String!
  label: String
  priceCents: Int!
  estimatedDays: Int
}`,
  },
  {
    name: "tax",
    fields: {
      CartItem: "taxCents: Int! @requires(unitPriceCents discountCents shippingCents)",
      Cart:
        "taxTotalCents: Int! @requires(subtotalCents discountTotalCents shippingTotalCents)",
      Product: "taxCategory: String",
    },
  },
  {
    name: "checkout",
    fields: {
      CartItem:
        "totalCents: Int! @requires(unitPriceCents quantity discountCents shippingCents taxCents)",
      Cart:
        "grandTotalCents: Int! @requires(subtotalCents discountTotalCents shippingTotalCents taxTotalCents); checkoutUrl: String",
    },
  },
  {
    name: "loyalty",
    fields: {
      Cart: "pointsToEarn: Int! @requires(grandTotalCents)",
      Customer: "loyaltyTier: String; loyaltyPoints: Int",
      Order: "pointsEarned: Int",
    },
  },
  {
    name: "fraud",
    fields: {
      Cart: "riskScore: Float! @requires(grandTotalCents itemCount)",
      Order: "riskScore: Float",
      Customer: "trustLevel: String",
    },
  },
  {
    name: "installments",
    fields: {
      Cart: "installmentPlans: [InstallmentPlan!]! @requires(grandTotalCents)",
    },
    extra: `type InstallmentPlan {
  months: Int!
  monthlyCents: Int!
  aprPercent: Float
}`,
  },

  // --- @requires chains: product ranking -------------------------------------
  {
    name: "procurement",
    fields: { Product: "costCents: Int; supplierName: String" },
  },
  {
    name: "sale-pricing",
    fields: {
      Product: "salePriceCents: Int @requires(listPriceCents); onSale: Boolean",
      Variant: "salePriceCents: Int @requires(listPriceCents)",
    },
  },
  {
    name: "margins",
    fields: { Product: "marginPercent: Float @requires(salePriceCents costCents)" },
  },
  {
    name: "ranking",
    fields: {
      Product: "rankScore: Float @requires(salePriceCents ratingAverage marginPercent)",
    },
  },
  {
    name: "badges",
    fields: { Product: "badges: [String!]! @requires(rankScore onSale)" },
  },
  {
    name: "price-history",
    fields: { Product: "lowestPrice30dCents: Int @requires(salePriceCents)" },
  },

  // --- @requires chains: orders ----------------------------------------------
  {
    name: "order-totals",
    fields: { Order: "subtotalCents: Int!; totalCents: Int!" },
  },
  {
    name: "refunds",
    fields: {
      Order: "refundableCents: Int! @requires(totalCents)",
      OrderItem: "refundableCents: Int! @requires(unitPriceCents quantity)",
    },
  },
  {
    name: "invoices",
    fields: {
      Order: "invoiceUrl: String; invoiceTotalCents: Int! @requires(totalCents refundableCents)",
    },
  },
  {
    name: "returns",
    fields: {
      Order: "returnWindowEndsAt: String @requires(placedAt)",
      OrderItem: "returnEligible: Boolean @requires(quantity refundableCents)",
    },
  },
  {
    name: "merchandising",
    fields: {
      Category: "products(first: Int = 10): [Product!]!; featured: [Product!]!",
      Brand: "products(first: Int = 10): [Product!]!",
    },
  },

  // --- Contributors: one team, a couple of fields on existing entities -------
  {
    name: "media",
    fields: {
      Product: "images: [String!]!; thumbnailUrl: String; videoUrl: String",
      Variant: "imageUrl: String",
      Category: "bannerUrl: String",
      Brand: "heroImageUrl: String",
    },
  },
  {
    name: "seo",
    fields: {
      Product: "metaTitle: String; metaDescription: String; canonicalUrl: String",
      Category: "metaTitle: String; metaDescription: String",
      Brand: "metaTitle: String",
    },
  },
  {
    name: "recommendations",
    fields: {
      Product: "related: [Product!]!; frequentlyBoughtWith: [Product!]!",
      Customer: "recommended: [Product!]!",
      Cart: "upsells: [Product!]!",
    },
  },
  {
    name: "wishlists",
    fields: { Customer: "wishlist: [Product!]!", Product: "wishlistCount: Int" },
  },
  {
    name: "questions",
    fields: { Product: "questionCount: Int; topQuestion: String" },
  },
  {
    name: "availability",
    fields: {
      Product: "availability: String; restockDate: String",
      Variant: "availableForPickup: Boolean",
    },
  },
  {
    name: "store-inventory",
    fields: { Variant: "pickupStores: [Store!]!", Store: "pickupEnabled: Boolean" },
  },
  {
    name: "delivery-estimates",
    fields: {
      Product: "deliveryEstimateDays: Int; expressEligible: Boolean",
      CartItem: "estimatedDelivery: String",
      Shipment: "estimatedArrival: String",
    },
  },
  {
    name: "warranties",
    fields: {
      Product: "warrantyMonths: Int; extendedWarrantyAvailable: Boolean",
      OrderItem: "warrantyExpiresAt: String",
    },
  },
  {
    name: "compliance",
    fields: {
      Product: "ageRestricted: Boolean; hazmat: Boolean; countryRestrictions: [String!]!",
    },
  },
  {
    name: "sustainability",
    fields: {
      Product: "ecoScore: String; carbonGrams: Int",
      Brand: "sustainabilityRating: String",
    },
  },
  {
    name: "attributes",
    fields: {
      Product: "attributes: [ProductAttribute!]!",
      Variant: "optionValues: [String!]!",
    },
    extra: `type ProductAttribute {
  name: String!
  value: String
  unit: String
}`,
  },
  {
    name: "translations",
    fields: {
      Product:
        'localizedName(locale: String = "en"): String; localizedDescription(locale: String = "en"): String',
      Category: 'localizedName(locale: String = "en"): String',
    },
  },
  {
    name: "analytics",
    fields: {
      Product: "viewCount: Int; purchaseCount: Int; conversionRate: Float",
      Category: "popularity: Float",
    },
  },
  {
    name: "trending",
    roots: ["trending(first: Int = 10): [Product!]!"],
    fields: { Product: "trendingRank: Int" },
  },
  {
    name: "size-guides",
    fields: { Product: "sizeGuideUrl: String", Variant: "fitNote: String" },
  },
  {
    name: "personalization",
    fields: {
      Product: "personalizedRank: Float; recentlyViewed: Boolean",
      Customer: "segments: [String!]!",
    },
  },
  {
    name: "subscriptions",
    fields: {
      SubscriptionProduct: "plans: [SubscriptionPlan!]!",
      Customer: "activeSubscriptions: [SubscriptionProduct!]!",
    },
    extra: `type SubscriptionPlan {
  code: String!
  intervalMonths: Int!
  priceCents: Int!
}`,
  },
  {
    name: "digital-delivery",
    fields: {
      DigitalProduct: "licenseType: String; drmProtected: Boolean",
      OrderItem: "downloadUrl: String",
    },
  },
  {
    name: "gift-cards",
    fields: {
      GiftCardProduct: "customMessageAllowed: Boolean; expiryMonths: Int",
      GiftCardBalance: "cardNumberLast4: String",
    },
  },
  {
    name: "bundles",
    fields: { BundleProduct: "bundleSavingsCents: Int; bundleSize: Int" },
  },
  {
    name: "addresses",
    fields: {
      Customer: "addresses: [Address!]!",
      Order: "shippingCity: String; shippingCountryCode: String",
    },
    extra: `type Address {
  line1: String!
  city: String!
  postalCode: String
  countryCode: String!
}`,
  },
  {
    name: "preferences",
    fields: { Customer: "locale: String; currency: String; marketingOptIn: Boolean" },
  },
  {
    name: "notifications",
    fields: {
      Customer: "unreadNotificationCount: Int",
      Order: "lastNotificationAt: String",
    },
  },
  {
    name: "support",
    fields: {
      Customer: "openTicketCount: Int",
      Order: "supportTickets: [SupportTicket!]!",
    },
    extra: `type SupportTicket {
  subject: String!
  status: String!
  openedAt: String
}`,
  },
  {
    name: "customer-credit",
    fields: { Customer: "storeCreditCents: Int; creditLimitCents: Int" },
  },
  {
    name: "referrals",
    fields: { Customer: "referralCode: String; referralCount: Int" },
  },
  {
    name: "seller-ratings",
    fields: {
      Seller: "ratingCount: Int; positivePercent: Float; responseTimeHours: Int",
    },
  },
  {
    name: "seller-policies",
    fields: { Seller: "returnPolicy: String; shippingPolicy: String" },
  },
  {
    name: "seller-catalog",
    fields: { Seller: "products(first: Int = 10): [Product!]!; productCount: Int" },
  },
  {
    name: "order-tracking",
    fields: {
      Order: "trackingUrl: String; estimatedDelivery: String",
      Shipment: "events: [TrackingEvent!]!",
    },
    extra: `type TrackingEvent {
  status: String!
  location: String
  occurredAt: String
}`,
  },
  {
    name: "carriers",
    fields: { Shipment: "carrierName: String; carrierLogoUrl: String; serviceLevel: String" },
  },
  {
    name: "customs",
    fields: {
      Shipment: "customsStatus: String; dutiesCents: Int",
      Product: "hsCode: String",
    },
  },
  {
    name: "promo-eligibility",
    fields: {
      Promotion: "eligibleSegments: [String!]!; usageCount: Int; usageLimit: Int",
    },
  },
  {
    name: "promo-content",
    fields: { Promotion: "bannerText: String; termsUrl: String" },
  },
  {
    name: "payment-risk",
    fields: { PaymentMethod: "verified: Boolean!; riskLevel: String" },
  },
  {
    name: "payment-tokens",
    fields: { PaymentMethod: "tokenProvider: String; lastUsedAt: String" },
  },
  {
    name: "cart-messages",
    fields: {
      Cart: "messages: [String!]!; freeShippingThresholdCents: Int",
      CartItem: "messages: [String!]!",
    },
  },
  {
    name: "gift-options",
    fields: { CartItem: "giftWrapAvailable: Boolean; giftWrapCents: Int" },
  },
  {
    name: "review-moderation",
    fields: {
      Review: "verifiedPurchase: Boolean; helpfulCount: Int; moderationStatus: String",
    },
  },
  {
    name: "brand-stories",
    fields: { Brand: "story: String; foundedYear: Int" },
  },
  {
    name: "stock-alerts",
    fields: {
      Variant: "backInStockSubscribers: Int",
      Customer: "stockAlerts: [Variant!]!",
    },
  },
];

// --- Subgraph SDL generation -------------------------------------------------

type FieldSpec = {
  name: string;
  /** `name(args): Type` without directives. */
  signature: string;
  type: string;
  requires: string[];
  provides: string[];
};

function parseFields(source: string | undefined): FieldSpec[] {
  return (source ?? "")
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const directive = (name: string) =>
        part.match(new RegExp(`@${name}\\(([^)]*)\\)`))?.[1].trim().split(/\s+/) ?? [];
      const signature = part.replace(/\s*@\w+\([^)]*\)/g, "").trim();
      const match = signature.match(/^(\w+)(?:\(.*\))?:\s*(.+)$/);
      if (!match) {
        throw new Error(`Invalid field spec: ${part}`);
      }
      return {
        name: match[1],
        signature,
        type: match[2],
        requires: directive("requires"),
        provides: directive("provides"),
      };
    });
}

const namedType = (type: string) => type.replace(/[\[\]!]/g, "");
const groupOf = (type: string) =>
  Object.keys(GROUPS).find((group) => GROUPS[group].includes(type));

function selectSubgraphs(): SubgraphSpec[] {
  const count = parseInt(process.env.SUBGRAPHS ?? `${SUBGRAPHS.length}`);
  if (!(count >= CORE_SUBGRAPHS && count <= SUBGRAPHS.length)) {
    throw new Error(`SUBGRAPHS must be between ${CORE_SUBGRAPHS} and ${SUBGRAPHS.length}`);
  }
  return SUBGRAPHS.slice(0, count);
}

const selected = selectSubgraphs();

// Which subgraph owns each `Type.field`, and its type (for @external).
const owners = new Map<string, { subgraph: string; type: string }>();
for (const subgraph of selected) {
  for (const [target, source] of Object.entries(subgraph.fields ?? {})) {
    for (const field of parseFields(source)) {
      for (const type of GROUPS[target] ?? [target]) {
        const key = `${type}.${field.name}`;
        if (owners.has(key)) {
          throw new Error(`${key} is defined by ${owners.get(key)!.subgraph} and ${subgraph.name}`);
        }
        owners.set(key, { subgraph: subgraph.name, type: field.type });
      }
    }
  }
}

// Fields another subgraph can resolve through @provides must be @shareable
// in the subgraph that owns them.
const provided = new Set<string>();
for (const subgraph of selected) {
  for (const source of Object.values(subgraph.fields ?? {})) {
    for (const field of parseFields(source)) {
      field.provides.forEach((name) => provided.add(`${namedType(field.type)}.${name}`));
    }
  }
}

function externalField(type: string, field: string, subgraph: string): string {
  const owner = owners.get(`${type}.${field}`);
  if (!owner) {
    throw new Error(`${subgraph}: ${type}.${field} is required/provided but not defined`);
  }
  return `${field}: ${owner.type} @external`;
}

function renderSubgraph(subgraph: SubgraphSpec): string {
  const contributed = subgraph.fields ?? {};
  // Object type -> field lines.
  const objects = new Map<string, string[]>();
  // Interface -> field lines.
  const interfaces = new Map<string, string[]>();
  const objectFields = (type: string) => {
    if (!objects.has(type)) {
      objects.set(type, []);
    }
    return objects.get(type)!;
  };
  const addExternal = (type: string, field: string) => {
    const lines = objectFields(type);
    if (!lines.some((line) => line.startsWith(`${field}:`) || line.startsWith(`${field}(`))) {
      lines.push(externalField(type, field, subgraph.name));
    }
  };

  for (const [target, source] of Object.entries(contributed)) {
    const fields = parseFields(source);
    if (GROUPS[target]) {
      interfaces.set(
        target,
        fields.map((field) => field.signature)
      );
    }
    for (const type of GROUPS[target] ?? [target]) {
      for (const field of fields) {
        const requires = field.requires.length
          ? ` @requires(fields: "${field.requires.join(" ")}")`
          : "";
        const provides = field.provides.length
          ? ` @provides(fields: "${field.provides.join(" ")}")`
          : "";
        const shareable = provided.has(`${type}.${field.name}`) ? " @shareable" : "";
        objectFields(type).push(`${field.signature}${shareable}${requires}${provides}`);
      }
    }
  }
  // @external declarations come after the subgraph's own fields.
  for (const [target, source] of Object.entries(contributed)) {
    for (const type of GROUPS[target] ?? [target]) {
      for (const field of parseFields(source)) {
        field.requires.forEach((required) => addExternal(type, required));
        field.provides.forEach((provided) => addExternal(namedType(field.type), provided));
      }
    }
  }

  // Entities and interfaces that are only referenced get a stub.
  const referenced = new Set<string>();
  const text = [
    ...(subgraph.roots ?? []),
    ...Object.values(contributed),
    subgraph.extra ?? "",
  ].join("\n");
  for (const name of [...ENTITIES, ...Object.keys(GROUPS)]) {
    if (new RegExp(`\\b${name}\\b`).test(text)) {
      referenced.add(name);
    }
  }
  for (const name of Object.keys(contributed)) {
    referenced.add(name);
  }
  for (const group of Object.keys(GROUPS)) {
    if (referenced.has(group)) {
      if (!interfaces.has(group)) {
        interfaces.set(group, []);
      }
      GROUPS[group].forEach((type) => referenced.add(type));
    }
  }

  const out: string[] = [
    `extend schema
  @link(
    url: "https://specs.apollo.dev/federation/v2.3"
    import: ["@key", "@shareable", "@external", "@requires", "@provides"]
  )`,
  ];

  if (subgraph.roots?.length) {
    out.push(`type Query {\n${subgraph.roots.map((root) => `  ${root}`).join("\n")}\n}`);
  }

  for (const [name, fields] of interfaces) {
    out.push(`interface ${name} {\n${["id: ID!", ...fields].map((f) => `  ${f}`).join("\n")}\n}`);
  }

  for (const type of ENTITIES.filter((entity) => referenced.has(entity))) {
    const group = groupOf(type);
    const implementing = group && interfaces.has(group) ? ` implements ${group}` : "";
    const fields = objects.get(type);
    const keys = subgraph.keys?.[type] ?? ["id"];
    if (!fields) {
      out.push(
        `type ${type}${implementing} @key(fields: "id", resolvable: false) {\n  id: ID!\n}`
      );
      continue;
    }
    const keyDirectives = keys.map((key) => ` @key(fields: "${key}")`).join("");
    const keyFields = keys
      .filter((key) => !fields.some((field) => field.startsWith(`${key}:`)))
      .map((key) => (key === "id" ? "id: ID!" : `${key}: ${owners.get(`${type}.${key}`)!.type}`));
    if (implementing && !keys.includes("id")) {
      throw new Error(`${subgraph.name}: ${type} implements ${group} and needs the id key`);
    }
    out.push(
      `type ${type}${implementing}${keyDirectives} {\n${[...keyFields, ...fields]
        .map((field) => `  ${field}`)
        .join("\n")}\n}`
    );
  }

  if (subgraph.extra) {
    out.push(subgraph.extra);
  }

  return out.join("\n\n") + "\n";
}

// --- Query generation --------------------------------------------------------

// Describes which composite fields to follow. Scalar fields are always all
// selected, unless `$only` narrows them down. For abstract types the plan
// applies to every possible type; `"...Type"` adds a plan for one of them.
type Plan = { $only?: string[]; [field: string]: Plan | string[] | undefined };

function renderSelection(
  schema: GraphQLSchema,
  type: GraphQLNamedType,
  plan: Plan,
  indent: string,
  /** Fields already selected on the interface, not repeated per fragment. */
  skip: Set<string> = new Set()
): string[] {
  if (!isObjectType(type) && !isInterfaceType(type)) {
    throw new Error(`Cannot select fields on ${type.name}`);
  }
  const lines: string[] = [];
  for (const field of Object.values(type.getFields())) {
    if (skip.has(field.name) || field.args.some((arg) => isNonNullType(arg.type))) {
      continue;
    }
    const fieldType = getNamedType(field.type);
    if (isLeafType(fieldType)) {
      if (!plan.$only || plan.$only.includes(field.name)) {
        lines.push(`${indent}${field.name}`);
      }
      continue;
    }
    const isEntity = ENTITIES.includes(fieldType.name) || isAbstractType(fieldType);
    const fieldPlan = plan[field.name] as Plan | undefined;
    // Value types are always expanded; entities only when the plan asks.
    if (isEntity && !fieldPlan) {
      continue;
    }
    lines.push(`${indent}${field.name} {`);
    lines.push(...renderComposite(schema, fieldType, fieldPlan ?? {}, indent + "  "));
    lines.push(`${indent}}`);
  }
  return lines;
}

function renderComposite(
  schema: GraphQLSchema,
  type: GraphQLNamedType,
  plan: Plan,
  indent: string
): string[] {
  if (!isCompositeType(type)) {
    throw new Error(`${type.name} is not a composite type`);
  }
  if (!isAbstractType(type)) {
    return renderSelection(schema, type, plan, indent);
  }

  const lines = [`${indent}__typename`];
  const shared = new Set<string>();
  if (isInterfaceType(type)) {
    const own = renderSelection(schema, type, plan, indent);
    lines.push(...own);
    Object.keys(type.getFields()).forEach((name) => shared.add(name));
  }
  for (const possible of schema.getPossibleTypes(type)) {
    const possiblePlan = { ...plan, ...((plan[`...${possible.name}`] as Plan) ?? {}) };
    const selection = renderSelection(schema, possible, possiblePlan, indent + "  ", shared);
    if (selection.length) {
      lines.push(`${indent}... on ${possible.name} {`, ...selection, `${indent}}`);
    }
  }
  return lines;
}

type QuerySpec = {
  description: string;
  roots: { field: string; args?: string; plan: Plan }[];
};

// A product as shown in a listing: a handful of fields, each owned by a
// different subgraph, including the end of the ranking @requires chain.
const productCard: Plan = {
  $only: [
    "id",
    "name",
    "slug",
    "listPriceCents",
    "salePriceCents",
    "onSale",
    "thumbnailUrl",
    "ratingAverage",
    "reviewCount",
    "badges",
    "availability",
    "deliveryEstimateDays",
    "trendingRank",
    "ecoScore",
    "weightGrams",
    "downloadSizeMb",
    "billingInterval",
    "bundleSize",
    "denominations",
    "optionNames",
  ],
  brand: { $only: ["name", "slug", "logoUrl"] },
};

const variantSummary: Plan = {
  $only: ["id", "sku", "title", "inStock", "listPriceCents", "salePriceCents", "imageUrl"],
};

const QUERIES: Record<string, QuerySpec> = {
  // Wide entity + interface: every field of `Product` (contributed by dozens
  // of subgraphs), expanded over all of its implementations.
  product_page: {
    description:
      "Product detail page: every field of the `Product` interface (owned by dozens of subgraphs) across all of its implementations, plus variants, reviews, promotions and recommendations",
    roots: [
      {
        field: "product",
        args: '(id: "1")',
        plan: {
          brand: {},
          categories: { parent: { $only: ["name", "slug"] } },
          seller: {},
          variants: { warehouses: {}, pickupStores: { $only: ["name", "city"] } },
          reviews: { author: { $only: ["displayName", "loyaltyTier", "trustLevel"] } },
          promotions: {},
          related: productCard,
          frequentlyBoughtWith: productCard,
          bundleItems: productCard,
        },
      },
    ],
  },

  // Abstract types: a union with 10 members spread over the graph, a second
  // union of content blocks, and product listings behind each of them.
  search: {
    description:
      "Search results page: the `SearchResult` union (6 product types, categories, brands, sellers, stores), the `ContentBlock` union of the landing page and product listings nested under them",
    roots: [
      {
        field: "search",
        args: '(term: "shoes")',
        plan: {
          ...productCard,
          "...Category": { $only: undefined, products: productCard },
          "...Brand": { $only: undefined, products: productCard },
          "...Seller": { $only: undefined, products: productCard },
          "...Store": { $only: undefined },
        },
      },
      { field: "trending", plan: productCard },
      {
        field: "page",
        args: '(slug: "home")',
        plan: {
          blocks: {
            products: productCard,
            categories: { featured: productCard },
            promotion: {},
            brand: {},
          },
        },
      },
    ],
  },

  // @requires chains: cart and line item totals are computed by a chain of
  // subgraphs (pricing -> discounts -> shipping -> tax -> checkout -> loyalty).
  checkout: {
    description:
      "Checkout page: cart and line item totals computed through `@requires` chains 5 subgraphs deep, with the products, promotions (interface) and payment methods (interface) around them",
    roots: [
      {
        field: "cart",
        args: '(id: "1")',
        plan: {
          items: {
            variant: { warehouses: { $only: ["code", "region"] } },
            product: {
              $only: [
                "id",
                "name",
                "slug",
                "thumbnailUrl",
                "taxCategory",
                "deliveryEstimateDays",
                "ageRestricted",
                "hazmat",
                "warrantyMonths",
                "salePriceCents",
                "weightGrams",
                "licenseType",
                "billingInterval",
              ],
            },
          },
          appliedPromotions: {},
          upsells: productCard,
          customer: {
            paymentMethods: {},
          },
        },
      },
    ],
  },

  // Everything at once, several entity hops deep.
  order_history: {
    description:
      "Account page: customer, orders, line items, shipments and payment methods, with ranked products (the product `@requires` chain) 4 entity hops deep",
    roots: [
      {
        field: "me",
        plan: {
          orders: {
            items: {
              product: {
                ...productCard,
                $only: [...productCard.$only!, "rankScore", "marginPercent", "warrantyMonths"],
                seller: { $only: ["name", "rating", "positivePercent"] },
              },
              variant: variantSummary,
            },
            shipments: { warehouse: {} },
            paymentMethod: {},
          },
          reviews: { product: { $only: ["name", "slug", "thumbnailUrl"] } },
          wishlist: productCard,
          recommended: productCard,
          activeSubscriptions: { $only: ["id", "name", "billingInterval", "trialDays"] },
          stockAlerts: variantSummary,
          cart: { $only: ["id", "itemCount", "grandTotalCents"] },
          paymentMethods: {},
        },
      },
    ],
  },
};

// `__ID__` is replaced by the benchmark to make the operation name and the
// root aliases unique, so gateways can't serve the plan from their caches.
function renderQuery(schema: GraphQLSchema, name: string, spec: QuerySpec): string {
  const queryType = schema.getQueryType()!;
  const operationName = name.replace(/(^|_)(\w)/g, (_, __, c) => c.toUpperCase());
  const lines = [`query ${operationName}__ID__ {`];
  for (const root of spec.roots) {
    const field = queryType.getFields()[root.field];
    lines.push(`  ${root.field}__ID__: ${root.field}${root.args ?? ""} {`);
    lines.push(...renderComposite(schema, getNamedType(field.type), root.plan, "    "));
    lines.push("  }");
  }
  lines.push("}");
  return lines.join("\n");
}

// --- Main --------------------------------------------------------------------

function main() {
  rmSync(join(OUT, "subgraphs"), { recursive: true, force: true });
  mkdirSync(join(OUT, "subgraphs"), { recursive: true });

  const services = selected.map((subgraph) => {
    const sdl = renderSubgraph(subgraph);
    writeFileSync(join(OUT, "subgraphs", `${subgraph.name}.graphql`), sdl);
    return { name: subgraph.name, sdl };
  });

  const composition = composeServices(
    services.map(({ name, sdl }) => ({
      name,
      url: `${SUBGRAPH_URL}/${name}`,
      typeDefs: parse(sdl),
    }))
  );
  if (composition.errors?.length) {
    for (const error of composition.errors) {
      console.error(`- ${error.message}`);
    }
    throw new Error("Composition failed");
  }
  writeFileSync(join(OUT, "supergraph.graphql"), composition.supergraphSdl!);

  const schema = composition.schema!.toAPISchema().toGraphQLJSSchema();
  const queries: Record<string, string> = {};
  const descriptions: Record<string, string> = {};
  for (const [name, spec] of Object.entries(QUERIES)) {
    const query = renderQuery(schema, name, spec);
    const errors = validate(schema, parse(query.replaceAll("__ID__", "_check")));
    if (errors.length) {
      throw new Error(`Query ${name} is invalid:\n${errors.map((e) => e.message).join("\n")}`);
    }
    queries[name] = query;
    descriptions[name] = spec.description;
  }
  writeFileSync(
    join(OUT, "queries.js"),
    `// Generated by scripts/generate-large-graph.ts. Do not edit.
export const SUBGRAPH_COUNT = ${services.length};

export const DESCRIPTIONS = ${JSON.stringify(descriptions, null, 2)};

export const QUERIES = ${JSON.stringify(queries, null, 2)};
`
  );

  if (!process.env.SKIP_COSMO) {
    const graph = [
      "version: 1",
      "subgraphs:",
      ...services.flatMap(({ name }) => [
        `  - name: ${name}`,
        `    routing_url: ${COSMO_SUBGRAPH_URL}/${name}`,
        "    schema:",
        `      file: ./subgraphs/${name}.graphql`,
      ]),
    ].join("\n");
    const graphPath = join(OUT, "cosmo-graph.yaml");
    writeFileSync(graphPath, graph + "\n");
    try {
      execFileSync(
        "npx",
        ["-y", `wgc@${WGC_VERSION}`, "router", "compose", "-i", graphPath, "-o", join(OUT, "cosmo-config.json")],
        { stdio: "inherit", cwd: OUT }
      );
    } finally {
      rmSync(graphPath, { force: true });
    }
  }

  const fieldCount = (query: string) => query.split("\n").filter((l) => /^\s+\w+$/.test(l)).length;
  console.log(`Generated ${readdirSync(join(OUT, "subgraphs")).length} subgraphs in ${OUT}`);
  for (const [name, query] of Object.entries(queries)) {
    console.log(`  ${name}: ${fieldCount(query)} leaf fields, ${query.length} bytes`);
  }
}

main();
