import StudentContext from "./StudentContext";

const student_db = {
  students: [
    {
      student_id: "BCECE20251234",
      personal_details: {
        first_name: "Ravi",
        last_name: "Kumar",
        father_name: "Suresh Kumar",
        mother_name: "Anita Devi",
        date_of_birth: "2003-07-15",
        gender: "Male",
        nationality: "Indian",
        category: "General",
        aadhar_number: "1234-5678-9012",
        profile_photo: "https://example.com/ravi_photo.jpg",
      },
      contact_information: {
        email: "ravi.kumar@example.com",
        phone: "+91-9876543210",
        social_links: {
          linkedin: "https://linkedin.com/in/ravikumar",
          github: "https://github.com/ravikumar",
          portfolio: "https://ravikumar.dev",
        },
      },
      academic_details: {
        register_number: "BCECE2023REG45678",
        roll_number: "BCECE2023ROLL1234",
        college: {
          name: "Muzaffarpur Institute of Technology (MIT)",
          university: "Aryabhatta Knowledge University, Patna",
          degree: "B.Tech",
          branch: "Mechanical Engineering",
          admission_year: 2021,
          current_semester: "6th",
          cgpa: 8.4,
        },
      },
    },
    {
      student_id: "BCECE20256789",
      personal_details: {
        first_name: "Pooja",
        last_name: "Singh",
        father_name: "Vikram Singh",
        mother_name: "Sunita Devi",
        date_of_birth: "2002-10-25",
        gender: "Female",
        nationality: "Indian",
        category: "OBC",
        aadhar_number: "5678-9012-3456",
        profile_photo: "https://example.com/pooja_photo.jpg",
      },
      academic_details: {
        register_number: "BCECE2023REG98765",
        roll_number: "BCECE2023ROLL5678",
        college: {
          name: "Bhagalpur College of Engineering (BCE)",
          university: "Aryabhatta Knowledge University, Patna",
          degree: "B.Tech",
          branch: "Computer Science & Engineering",
          admission_year: 2020,
          current_semester: "8th",
          cgpa: 9.2,
        },
      },
    },
    {
      student_id: "BCECE20257890",
      personal_details: {
        first_name: "Amit",
        last_name: "Sharma",
        father_name: "Rajesh Sharma",
        mother_name: "Madhuri Sharma",
        date_of_birth: "2001-12-10",
        gender: "Male",
        nationality: "Indian",
        category: "SC",
        aadhar_number: "8765-4321-0987",
        profile_photo: "https://example.com/amit_photo.jpg",
      },
      academic_details: {
        register_number: "BCECE2023REG65432",
        roll_number: "BCECE2023ROLL7890",
        college: {
          name: "Gaya College of Engineering (GCE)",
          university: "Aryabhatta Knowledge University, Patna",
          degree: "B.Tech",
          branch: "Civil Engineering",
          admission_year: 2019,
          current_semester: "8th",
          cgpa: 8.8,
        },
      },
    },
    {
      student_id: "BCECE20253456",
      personal_details: {
        first_name: "Neha",
        last_name: "Verma",
        father_name: "Sanjay Verma",
        mother_name: "Anjali Verma",
        date_of_birth: "2003-03-21",
        gender: "Female",
        nationality: "Indian",
        category: "EWS",
        aadhar_number: "2345-6789-0123",
        profile_photo: "https://example.com/neha_photo.jpg",
      },
      academic_details: {
        register_number: "BCECE2023REG43210",
        roll_number: "BCECE2023ROLL3456",
        college: {
          name: "Darbhanga College of Engineering (DCE)",
          university: "Aryabhatta Knowledge University, Patna",
          degree: "B.Tech",
          branch: "Electrical Engineering",
          admission_year: 2022,
          current_semester: "4th",
          cgpa: 8.1,
        },
      },
    },
    {
      student_id: "BCECE20254567",
      personal_details: {
        first_name: "Saurabh",
        last_name: "Jha",
        father_name: "Anil Jha",
        mother_name: "Kusum Jha",
        date_of_birth: "2002-08-14",
        gender: "Male",
        nationality: "Indian",
        category: "General",
        aadhar_number: "7654-3210-5678",
        profile_photo: "https://example.com/saurabh_photo.jpg",
      },
      academic_details: {
        register_number: "BCECE2023REG32109",
        roll_number: "BCECE2023ROLL4567",
        college: {
          name: "Nalanda College of Engineering (NCE)",
          university: "Aryabhatta Knowledge University, Patna",
          degree: "B.Tech",
          branch: "Electronics & Communication Engineering",
          admission_year: 2020,
          current_semester: "8th",
          cgpa: 9.0,
        },
      },
    },
    {
      student_id: "BCECE20259876",
      personal_details: {
        first_name: "Anjali",
        last_name: "Mishra",
        father_name: "Surendra Mishra",
        mother_name: "Manisha Mishra",
        date_of_birth: "2001-11-05",
        gender: "Female",
        nationality: "Indian",
        category: "General",
        aadhar_number: "9012-3456-7890",
        profile_photo: "https://example.com/anjali_photo.jpg",
      },
      academic_details: {
        register_number: "BCECE2023REG21098",
        roll_number: "BCECE2023ROLL9876",
        college: {
          name: "Patna Sahib College of Engineering (PSCE)",
          university: "Aryabhatta Knowledge University, Patna",
          degree: "B.Tech",
          branch: "Information Technology",
          admission_year: 2019,
          current_semester: "8th",
          cgpa: 9.3,
        },
      },
    },
  ],
};

const StudentProvider = ({ children }) => {
  return (
    <StudentContext.Provider value={student_db}>
      {children}     
    </StudentContext.Provider>
  );
};
export default StudentProvider;
        