.PHONY: clean
clean:
	rm -rf node_modules .cache public

.PHONY: develop
	npm start

.PHONY: format
format: node_modules/prettier
	npm run format

node_modules/eslint:
	npm install 

# node_modules/jest:
# 	npm install 

node_modules/prettier:
	npm install 

node_modules/typescript:
	npm install 

# .PHONY: test
# test: node_modules/jest
# 	npm run test

# node_modules/cypress:
# 	npm install --frozen-lockfile

.PHONY: test-all
test-all:
	$(MAKE) test-audit
	$(MAKE) test-format
	$(MAKE) test-lint
	$(MAKE) test-types

.PHONY: test-audit
test-audit:
	npm run test:audit

.PHONY: test-format
test-format: node_modules/prettier
	npm run test:format

.PHONY: test-lint
test-lint: node_modules/eslint
	npm run test:lint

.PHONY: test-types
test-types: node_modules/typescript
	npm run test:types

# .PHONY: test-cypress
# test-cypress: node_modules/cypress
# 	npm run test:cypress

LICENSE:
	@echo "you must have a LICENSE file" 1>&2
	exit 1

LICENSE_HEADER:
	@echo "you must have a LICENSE_HEADER file" 1>&2
	exit 1

.PHONY: license
license: LICENSE LICENSE_HEADER
	cd client && npm ci && npm run license:fix
	cd docker && npm ci && npm run license:fix

.PHONY: test-license
test-license: LICENSE LICENSE_HEADER
	cd client && npm ci && npm run test:license
	cd docker && npm ci && npm run test:license