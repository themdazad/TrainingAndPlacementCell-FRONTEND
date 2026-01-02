Training & Placement Cell - GEC Siwan

# 🌐 Deployment Links
Live (Main): https://training-and-placement-cell-gec-siwan.vercel.app/
Pre-Production (Staging): https://preview-tpcellgecsiwan.vercel.app/

# 🛠 Branching Strategy (For 20 Developers)
Humne is project ke liye ek strict branching model set kiya hai taaki live site crash na ho:

*main*: Sirf stable releases ke liye. Yahan direct push allowed nahi hai.

staging: Pre-production testing zone. Yahan code tabhi aata hai jab use develop par test kar liya jaye.

develop: Default Branch. Sabhi developers ka base branch yahi hai.

# 🚀 Contribution Workflow
Saare developers ko ye steps follow karna compulsory hai:

Sync Local: Kaam shuru karne se pehle git pull origin develop karein.

New Branch: Hamesha naye kaam ke liye branch banayein:

git checkout -b feature/yourname-taskname

Commit: Clear messages ke saath commit karein.

Pull Request (PR): Kaam khatam hone par GitHub par develop branch ke liye PR open karein.

Approval: PR tabhi merge hogi jab Admin (Md. Azad) use approve karega.

# Naming Conventions
Consistency maintain karne ke liye ye rules follow karein:

Element	Convention	Example
Components & Containers	PascalCase	UserProfile, SidebarMenu
Variables & Functions	camelCase	getUserData, formatDate
Routes & Views	kebab-case	user-dashboard.js
Constants / ENV	UPPER_CASE	API_URL, JWT_SECRET

📦 Getting Started
Bash
# Repo clone karein
git clone https://github.com/themdazad/TrainingAndPlacementCell-FRONTEND

# Dependencies install karein
npm install

# Development server start karein
npm run dev


👤 Project Owner & Admin
Md. Azad

📧 Email: collezian@gmail.com
📱 WhatsApp: +91 9119172886
🔗 GitHub: @themdazad