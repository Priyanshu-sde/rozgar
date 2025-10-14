#!/bin/bash

# Rojgar - Setup Verification Script
# This script verifies that all necessary files are in place

echo "🔍 Verifying Rojgar Project Setup..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counter
PASS=0
FAIL=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        ((FAIL++))
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((PASS++))
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        ((FAIL++))
    fi
}

echo "📁 Checking Project Structure..."
echo ""

# Root files
echo "Root Configuration Files:"
check_file "package.json"
check_file "vite.config.js"
check_file "tailwind.config.js"
check_file "postcss.config.js"
check_file "index.html"
check_file ".env.example"
check_file ".gitignore"
check_file "eslint.config.js"
check_file ".eslintrc.json"
echo ""

# Documentation
echo "Documentation:"
check_file "README.md"
check_file "QUICKSTART.md"
check_file "DEPLOYMENT.md"
check_file "PROJECT_SUMMARY.md"
echo ""

# Source directories
echo "Source Directories:"
check_dir "src"
check_dir "src/components"
check_dir "src/contexts"
check_dir "src/i18n"
check_dir "src/i18n/locales"
check_dir "src/mocks"
check_dir "src/pages"
check_dir "src/utils"
check_dir "public"
echo ""

# Main app files
echo "Main Application Files:"
check_file "src/main.jsx"
check_file "src/App.jsx"
check_file "src/index.css"
echo ""

# Components
echo "Components:"
check_file "src/components/Layout.jsx"
check_file "src/components/Navbar.jsx"
check_file "src/components/Sidebar.jsx"
check_file "src/components/Modal.jsx"
check_file "src/components/JobCard.jsx"
check_file "src/components/SkillCard.jsx"
check_file "src/components/PostCard.jsx"
check_file "src/components/EmployerCard.jsx"
check_file "src/components/Badge.jsx"
echo ""

# Contexts
echo "Contexts:"
check_file "src/contexts/AuthContext.jsx"
check_file "src/contexts/AppContext.jsx"
echo ""

# Pages
echo "Pages:"
check_file "src/pages/Login.jsx"
check_file "src/pages/Signup.jsx"
check_file "src/pages/Dashboard.jsx"
check_file "src/pages/JobBoard.jsx"
check_file "src/pages/JobMap.jsx"
check_file "src/pages/SkillLibrary.jsx"
check_file "src/pages/Community.jsx"
check_file "src/pages/Profile.jsx"
check_file "src/pages/Employers.jsx"
check_file "src/pages/EmployerPage.jsx"
check_file "src/pages/Notifications.jsx"
check_file "src/pages/ResumeBuilder.jsx"
check_file "src/pages/NotFound.jsx"
echo ""

# Utils
echo "Utilities:"
check_file "src/utils/firebase.js"
check_file "src/utils/helpers.js"
check_file "src/utils/aiAgent.js"
check_file "src/utils/comm.js"
echo ""

# i18n
echo "Internationalization:"
check_file "src/i18n/config.js"
check_file "src/i18n/locales/en.json"
check_file "src/i18n/locales/hi.json"
echo ""

# Mocks
echo "Mock Data:"
check_file "src/mocks/seed.js"
echo ""

# Public assets
echo "Public Assets:"
check_file "public/rojgar-icon.svg"
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 Verification Summary:"
echo -e "${GREEN}✓ Passed: $PASS${NC}"
echo -e "${RED}✗ Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 All checks passed! Project is ready.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run: npm install"
    echo "2. Run: npm run dev"
    echo "3. Open: http://localhost:3000"
    echo ""
    echo "📚 Read QUICKSTART.md for detailed setup instructions."
else
    echo -e "${RED}⚠️  Some files are missing. Please check the errors above.${NC}"
    exit 1
fi

# Check if node_modules exists
echo ""
echo "🔍 Checking Dependencies..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists"
    echo ""
    echo "Ready to run: npm run dev"
else
    echo -e "${YELLOW}⚠${NC}  node_modules not found"
    echo ""
    echo "Run: npm install"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
