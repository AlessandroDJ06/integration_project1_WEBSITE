# Zaroc Project Website - Integration Project (1st Year Applied Computer Science)

Welcome to the official project showcase website for **Zaroc**, developed as part of the 1st-year Integration Project (Integratieproject 1) at **Karel de Grote (KdG) Hogeschool**. 

This web repository serves as the comprehensive presentation layer, documentation center, and analysis dashboard for the Zaroc JavaFX board game application. It highlights the architectural choices, data science insights, and the deep learning stack built during the academic year.

---

## Project Disclaimer: Local Execution and Server-Side Script Dependencies

### Important Note on Local Deployment
This website uses native PHP backend scripts (such as `geminihandler.php`, `savedata.php`, and `savepagedata.php`) to manage data logging, statistics persistence, and server-side logic. 

**Crucial Notice:** A large portion of the interactive elements on this website are not just static front-end features; they actively depend on these server-side scripts running continuously in the background. Because these scripts require a live server environment to process data, opening the raw HTML files directly in a web browser will fail to execute any of the interactive components. To test the interactive functionality locally, you must actively run a local web server stack (such as XAMPP, WampServer, or the native PHP built-in web server) capable of executing these PHP scripts.

### Limited Functionality for External Observers
The data pipelines, AI analysis dashboards, and live demonstrations are tightly integrated with internal databases and script endpoints hosted securely within the **Karel de Grote Hogeschool network infrastructure**. Because external observers cannot access or run these school-hosted server dependencies, the following interactive features **will not function when cloned or hosted outside the KdG network**:
* **The Interactive Demo:** Pages relying on active server-side script evaluations.
* **AI Analysis Pages (Correlations & Move Data):** Advanced data science visualizations, regression models, and exploratory scatter plots generated from game data logs.
* **Data Logging:** User interactions and page frequency statistics logging mechanisms that rely on automated server-side data capture[cite: 3].

---

## Structure and Pages

The repository contains static web layouts, custom asset components, data files, and server side configurations:

### Core Documentation and Presentation Pages
* `index.html`: The central landing gateway providing a complete overview of the Zaroc ecosystem and development milestones[cite: 3].
* `html/spelregels.html`: Interactive rule guide mapping the board mechanics, linear move generation, and spatial limitations[cite: 3].
* `html/infrastructure.html`: Technical overview detailing the hosting setup, network architecture, and continuous deployment pipeline[cite: 3].
* `html/installatiepagina.html`: Detailed configuration step-by-step documentation for launching the JavaFX application client[cite: 3].
* `html/contact.html`: Team overview profiling the authors and creators of the project[cite: 3].

### Technical Concept Patterns
* `html/conceptualthinking.html`: High-level structural blueprints featuring Use Case Diagrams, System Sequence Diagrams (SSD), and Domain Models[cite: 3].
* `html/gamemodel.html`: Granular programmatic breakdown highlighting the Model-View-Presenter (MVP) architecture[cite: 3].
* `html/database.html` & `html/erd.html`: Full database infrastructure layouts, physical layer entity-relationship diagrams (ERD), and relational data dictionary structures[cite: 3].

### Data Science and AI Analytics
* `html/aispeler.html`: Breakdown of the custom Monte Carlo Tree Search (MCTS) algorithm and Neural Network deployment[cite: 3].
* `html/movedata.html`: Exploration maps displaying statistical analysis, polynomial regressions, and descriptive analysis metrics harvested from human vs. AI match profiles[cite: 3].

---

## Technical Architecture

* **Frontend Layout:** Standard HTML5, modular CSS3 (structured styling sheets per specific domain), and raw JavaScript (ES6+)[cite: 3].
* **Backend Processing:** PHP 8+ handling script execution, API integration, database communication wrappers, and filesystem read/writes[cite: 3].
* **Data Sources:** Raw CSV formatting structures translated into interactive JS graphs.

---

## Setup and Running Locally

To preview the visual layouts and non-database assets locally:

### Option 1: PHP Built-in Server (Recommended)
If you have PHP installed globally on your machine, navigate to the project directory via your terminal and execute:
```bash
php -S localhost:8000
