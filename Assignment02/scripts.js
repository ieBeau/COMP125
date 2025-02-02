// Introduction Prompt
const header = document.querySelector("header");
window.addEventListener("load", function () {
    const userName = prompt("Please enter your name:");
    if (userName) {
        const welcomeMessage = document.createElement("h1");
        welcomeMessage.textContent = `Welcome, ${userName}! To `;
        header.insertBefore(welcomeMessage, header.firstChild);
    }
});


// Mission Statement Section
const missionContent = document.getElementById("missionContent");
const missionButton = document.getElementById("missionButton");

let alterMission = false;
missionButton.addEventListener("click", function () {
    if (alterMission) {
        missionContent.style.color = "black";
        missionButton.style.backgroundColor = "#3c3c3c";
    } else {
        missionContent.style.color = "red";
        missionButton.style.backgroundColor = "#082a00";
    }
    alterMission = !alterMission;
});


// Mission Statement Button
missionButton.addEventListener("mouseover", function () {
    missionButton.style.backgroundColor = alterMission ? "#041700" : "#000";
});

missionButton.addEventListener("mouseout", function () {
    missionButton.style.backgroundColor = alterMission ? "#082a00" : "#3c3c3c";
});


// Semester Section
const semesterContent = document.getElementById("semesterContent");
const semesterButton = document.getElementById("semesterButton");

const previousCourses = new Set([
    'COMM170 - College Communications 2',
    'COMP100 - Programming 1',
    'COMP120 - Software Engineering Fundamentals',
    'COMP213 - Web Interface Design',
    'GNED228 - AI: Are Robots People, Too?',
    'MATH175 - Functions & Number Systems'
]);

let alterSemester = false;
semesterButton.addEventListener("click", function () {
    if (alterSemester) {
        for (let i = semesterContent.childNodes.length - 1; i >= 0; i--) {
            const node = semesterContent.childNodes.item(i);
            if (node.textContent === 'Semester 1') semesterContent.removeChild(node);
            if (previousCourses.has(node.textContent)) semesterContent.removeChild(node);
        }

        semesterContent.style.columns = 1;

        semesterButton.textContent = "Show Courses From Previous Semesters";
        semesterButton.style.backgroundColor = "#3c3c3c";
    } else {
        const newSemester = document.createElement("div");
        newSemester.textContent = 'Semester 1';
        newSemester.style.fontWeight = 'bold';
        newSemester.style.marginBottom = '5px'
        semesterContent.appendChild(newSemester);
    
        previousCourses.forEach(course => {
            const newCourse = document.createElement("li");
            newCourse.textContent = course;
            semesterContent.appendChild(newCourse);
        });

        semesterContent.style.columns = 2;

        semesterButton.textContent = "Hide Courses From Previous Semesters";
        semesterButton.style.backgroundColor = "#082a00";
    }

    alterSemester = !alterSemester;
});


// Semester List Button
semesterButton.addEventListener("mouseover", function () {
    semesterButton.style.backgroundColor = alterSemester ? "#041700" : "#000";
});

semesterButton.addEventListener("mouseout", function () {
    semesterButton.style.backgroundColor = alterSemester ? "#082a00" : "#3c3c3c";
});


// Skills List Section
const skillsContent = document.getElementById("skillsContent");
const skillsButton = document.getElementById("skillsButton");

let alterSkills = false;
skillsButton.addEventListener("click", function () {
    if (alterSkills) {
        skillsContent.removeChild(skillsContent.firstChild);

        skillsButton.textContent = "Add React To The Skillset";
        skillsButton.style.backgroundColor = "#3c3c3c";
    } else {
        const newSkill = document.createElement("li");
        newSkill.textContent = "React";
        skillsContent.insertBefore(newSkill, skillsContent.firstChild);

        skillsButton.textContent = "Remove React From The Skillset";
        skillsButton.style.backgroundColor = "#082a00";
    }
    
    alterSkills = !alterSkills;
});


// Skills List Button
skillsButton.addEventListener("mouseover", function () {
    skillsButton.style.backgroundColor = alterSkills ? "#041700" : "#000";
});

skillsButton.addEventListener("mouseout", function () {
    skillsButton.style.backgroundColor = alterSkills ? "#082a00" : "#3c3c3c";
});