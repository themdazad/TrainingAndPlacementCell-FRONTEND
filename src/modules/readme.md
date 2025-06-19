`Role` based folders

->Each folder contain:
|-compoments
	|-component folder (ComponentName + components-style.css) - if required
|-styles
|-pages

#Role:
i.	`Shared`:
		-Public features pages (e.g. home, about, auth-page, contact-us etc.)
		-No *Auth required*
ii.	`Student`:
		-Student features pages (e.g. student_dashboard, resume-builder etc.)
		-*Auth required*
iii.`Coordinator`:
		-T&P Coordinator features pages (e.g. coordinator_dashboard, job_post, verify_student etc.)
		-*Auth required*
iv.	`Admin`:
		-Admin features pages (e.g. admin_dashboard, admin_access etc.)
		-*Auth required*