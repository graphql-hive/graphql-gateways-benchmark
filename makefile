install:
	@for dir in ./gateways/*; do \
		if [ -d $$dir ]; then \
			echo "Installing $$dir"; \
			(cd $$dir && ./install.sh); \
			(cd $$dir && touch k6_summary.json && touch k6_summary.txt); \
			echo "\n"; \
		fi; \
	done

# Build and run the subgraphs
run-subgraphs:
	cargo build --release && ./target/release/subgraphs

test:
	@if [ -z "$(gateway)" ]; then \
		echo "Usage: make test gateway=<gateway_name> mode=<constant|stress>"; \
		exit 1; \
	fi
	@if [ -z "$(mode)" ]; then \
	    echo "Usage: make test gateway=<gateway_name> mode=<constant|stress>"; \
		exit 1; \
	fi
	@./test.sh $(gateway) $(mode)

test-all:
	@if [ -z "$(mode)" ]; then \
		echo "Usage: make test-all mode=<constant|stress>"; \
		exit 1; \
	fi
	@for gateway in $(shell ls ./gateways); do \
		if [ -d ./gateways/$$gateway ]; then \
			echo "Testing $$gateway"; \
			make test gateway=$$gateway mode=$(mode) || exit 1; \
			echo "\n"; \
		fi; \
	done
	cargo run -p toolkit summary
	cargo run -p toolkit data
