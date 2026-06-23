const API =
"http://localhost:5000/api/students";

let allStudents = [];

let editId = null;

async function addStudent(){

const student = {

studentId:
document.getElementById(
"studentId"
).value,

name:
document.getElementById(
"name"
).value,

email:
document.getElementById(
"email"
).value,

phone:
document.getElementById(
"phone"
).value,

department:
document.getElementById(
"department"
).value,

year:
document.getElementById(
"year"
).value,

address:
document.getElementById(
"address"
).value

};

if(editId){

await fetch(

`${API}/${editId}`,

{
method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(student)

}

);

editId = null;

}else{

await fetch(

API,

{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:
JSON.stringify(student)

}

);

}

clearForm();

getStudents();

}

async function getStudents(){

const response =
await fetch(API);

const students =
await response.json();

allStudents =
students;

displayStudents(
students
);

}

function displayStudents(
students
){

let output = "";

students.forEach(
student => {

output += `

<tr>

<td>
${student.studentId}
</td>

<td>
${student.name}
</td>

<td>
${student.email}
</td>

<td>
${student.department}
</td>

<td>

<button
onclick="editStudent(
'${student._id}'
)">
Edit
</button>

</td>

<td>

<button
onclick="deleteStudent(
'${student._id}'
)">
Delete
</button>

</td>

</tr>

`;

}
);

document
.getElementById(
"studentTable"
)
.innerHTML =
output;

}

async function deleteStudent(
id
){

await fetch(

`${API}/${id}`,

{
method:"DELETE"
}

);

getStudents();

}

function editStudent(
id
){

const student =
allStudents.find(

s =>
s._id === id

);

editId = id;

document
.getElementById(
"studentId"
).value =
student.studentId;

document
.getElementById(
"name"
).value =
student.name;

document
.getElementById(
"email"
).value =
student.email;

document
.getElementById(
"phone"
).value =
student.phone;

document
.getElementById(
"department"
).value =
student.department;

document
.getElementById(
"year"
).value =
student.year;

document
.getElementById(
"address"
).value =
student.address;

}

function searchStudent(){

const value =
document
.getElementById(
"search"
)
.value
.toLowerCase();

const filtered =
allStudents.filter(
student =>

(student.name || "")
.toLowerCase()
.includes(value)

);

displayStudents(
filtered
);

}

function clearForm(){

document
.querySelectorAll(
"input"
)
.forEach(
input =>
input.value = ""
);

}

getStudents();