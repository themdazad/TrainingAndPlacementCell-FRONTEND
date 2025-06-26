`Role` based folders

->Each folder contain:
|-compoments
	|-component folder (ComponentName + components-style.css) - if required
|-styles
|-views

#Role:
i.	`Web`:
		-Public features views (e.g. home, about, auth-page, contact-us etc.)
		-No *Auth required*
ii.	`Student`:
		-Student features views (e.g. student-dashboard, resume-builder etc.)
		-*Auth required*
iii.`Coordinator`:
		-T&P Coordinator features views (e.g. coordinator-dashboard, job_post, verify_student etc.)
		-*Auth required*
iv.	`Admin`:
		-Admin features views (e.g. admin_dashboard, admin-access etc.)
		-*Auth required*