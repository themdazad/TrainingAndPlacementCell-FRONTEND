<!-- 
Project Owner: 
Md. Azad  | Github- @themdazad
Email-collezian@gmail.com
Contact/Whatsapp-9119172886 
-->

`Contribution`
Frontend developer:  

<!-- Important  -->
Naming Convention:
`Components and Containers`: PascleCase,
`variables, function and utility files`: camelCase,
`routes & pages`: kebab-case
`Constants or ENV`: UPPERCASE or UPPER_CASE 

<!-- Files and Folder Structure -->
├───public :(Contain all static files)
│  
└───src
    ├───assets
    │   ├───data 
    │   └───images
    │       
    ├───components :(All Global components & third-party ui)
    |
    ├───api :(api calls )
    |
    ├───hooks (custom hooks)
    │  
    ├───modules :(Role folders)
    |   |
    │   ├───admin
    │   │   ├───components :(Role based components)
    │   │   ├───pages  :(role bases pages)
    │   │   └───styles :(page related stylessheets)
    |   |
    │   ├───shared
    │   │      
    │   └───student
    |
    ├───routes :(Role based routes )
    │       ├───example-student-routes.js
    │       ├───example-admin-routes.js
    |       └───example-shared-routes.js
    |
    ├───utils :(utilities or helper functions)
    |
    |
    ├───index.css :(Global Stylesheet)
    |
    └───main.jsx :(Root file)