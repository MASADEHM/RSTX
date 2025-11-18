# Project Setup Blueprint

## 1. Project Overview
A modern React + TypeScript web application for company setup and management, with a focus on user authentication, business rules, and a modern UI using Ant Design.

---

## 2. Technology Stack
- **Frontend:** React 18, TypeScript
- **UI Library:** Ant Design (all layout, navigation, grid, and components)
- **Routing:** React Router v6
- **State Management:** React useState/useEffect (no Redux)
- **Form Handling:** Ant Design Form
- **Validation:** Ant Design Form validation, custom business rules
- **Other:** react-input-mask, universal-cookie, axios
- **Testing:** Jest, React Testing Library (optional)
- **Build Tool:** Create React App (react-scripts)
- **Styling:** Ant Design, custom CSS

---

## 3. Project Structure
```
src/
  interfaces/                # TypeScript interfaces (e.g., company.interface.ts)
  pages/
    company/
      steps/                 # Multi-step wizard components (BusinessCategoryStep, TradeNameStep, etc.)
      CompanySetup.tsx       # Main company setup wizard
    about.tsx
    contactus.tsx
    home.tsx
    login.tsx
    signup.tsx
  services/                  # Business rules, country master, API services
  shared/                    # Shared UI components (Menu, Footer, HeroSlider)
  routes/                    # Routing setup
  App.tsx
  index.tsx
public/
  index.html
  ...
```

---

## 4. Key Features & Steps
- **Contact Us Page:** Form, Google Maps, company info.
- **Footer & Home Page:** Full-width footer, hero image slider.
- **Navigation:** Responsive menu using Ant Design only.
- **Authentication:** Login/Signup with validation.
- **About Us Page:** Company story, mission, vision, stats, timeline.
- **Company Setup Wizard:**  
  - **Business Category** (select)
  - **Activity Selection** (multi-select, based on category)
  - **Trade Name** (with uniqueness validation)
  - **Number of Shareholders**
  - **Shareholder Details** (multi-step, business rules: unique names, Emirates ID, passport for non-UAE, share % sum to 100%)
  - **Manager Details** (single manager, same residency logic as shareholder, passport upload for non-UAE)
  - **Complete Setup** (summary/finish)
- **Business Rules:**  
  - Trade names and shareholder names must be unique.
  - Emirates IDs must be unique and follow a masked format.
  - Shareholder percentages must sum to 100%.
  - Residency logic for both shareholders and manager.
  - Passport copy upload for non-UAE residents (front/back).

---

## 5. Special Implementation Notes
- **Multi-step forms** use sub-step logic and `preserve={false}` for Ant Design Form.Item to avoid validation issues.
- **File uploads** are handled with Ant Design Upload, storing files in state.
- **Country list** is managed in a service for dropdowns.
- **All business rules** are implemented in `services/companyBusinessRules.ts` (or similar).
- **All steps are modular** and can be reused or extended.
- **React Bootstrap and Bootstrap CSS have been fully removed.**
- **All layout, navigation, and grid are now handled by Ant Design.**

---

## 6. Setup Instructions
1. **Clone the repo**
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Start the app**
   ```bash
   npm start
   ```
4. **Environment variables:**  
   - Add any API keys (e.g., Google Maps) to `.env` as needed.

---

## 7. How to Recreate
- Use this file as a blueprint for Cursor AI or any developer.
- Recreate the folder structure and implement each step/component as described.
- Follow the business rules and UI/UX patterns outlined above.

---

## 8. Dependencies
List all major dependencies in `package.json` (see your current file for versions).

---

## 9. Customization
- To add new steps, create a new component in `pages/company/steps/` and add it to the wizard in `CompanySetup.tsx`.
- To change business rules, update the relevant service in `services/`.

---

**Migration Note:**
- The project previously used React Bootstrap for layout and navigation. All such components have been replaced with Ant Design equivalents for a unified UI/UX.

**This file serves as a comprehensive blueprint for recreating the project from scratch.** 