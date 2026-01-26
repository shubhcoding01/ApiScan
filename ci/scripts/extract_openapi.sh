#!/bin/bash
set -e

echo "🔍 Searching for OpenAPI spec..."

# Priority order
CANDIDATES=(
  "openapi.json"
  "openapi.yaml"
  "swagger.json"
  "swagger.yaml"
  "docs/openapi.json"
  "docs/swagger.json"
)

FOUND=false

for file in "${CANDIDATES[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ Found OpenAPI spec: $file"
    cp "$file" openapi.json
    FOUND=true
    break
  fi
done

if [ "$FOUND" = false ]; then
  echo "❌ OpenAPI spec not found!"
  echo "👉 Expected one of:"
  printf '%s\n' "${CANDIDATES[@]}"
  exit 1
fi

echo "📦 OpenAPI spec ready: openapi.json"
