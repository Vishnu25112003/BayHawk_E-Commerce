#!/bin/bash

# Cleanup script for unused files in BayHawk E-Commerce project
# This project uses Vite + React Router, not Next.js

echo "🔍 Analyzing unused files..."

# List of unused directories and files
UNUSED_DIRS=(
    "app"           # Next.js app directory (not used)
    "client"        # Duplicate folder (not imported)
    "dist"          # Build artifacts
    ".next"         # Next.js build cache
)

UNUSED_FILES=(
    "vercel.json"           # Next.js deployment config
    "pnpm-lock.yaml"        # Duplicate lock file (using npm)
    "postcss.config.mjs"    # Duplicate config
)

echo ""
echo "📋 Files/Folders to be removed:"
echo "================================"

# Show directories
for dir in "${UNUSED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        size=$(du -sh "$dir" 2>/dev/null | cut -f1)
        echo "📁 $dir/ ($size)"
    fi
done

# Show files
for file in "${UNUSED_FILES[@]}"; do
    if [ -f "$file" ]; then
        size=$(du -sh "$file" 2>/dev/null | cut -f1)
        echo "📄 $file ($size)"
    fi
done

echo ""
read -p "⚠️  Do you want to remove these files? (y/N): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🗑️  Removing unused files..."
    
    # Remove directories
    for dir in "${UNUSED_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            rm -rf "$dir"
            echo "✅ Removed: $dir/"
        fi
    done
    
    # Remove files
    for file in "${UNUSED_FILES[@]}"; do
        if [ -f "$file" ]; then
            rm -f "$file"
            echo "✅ Removed: $file"
        fi
    done
    
    echo ""
    echo "✨ Cleanup complete!"
    echo ""
    echo "📊 Space saved:"
    echo "Run: du -sh . to check current size"
else
    echo "❌ Cleanup cancelled"
fi
