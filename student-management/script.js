let students = JSON.parse(localStorage.getItem('students')) || [];
const perPage = 5;
let currentPage = 1;

const studentForm = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');
const searchInput = document.getElementById('search');
const paginationDiv = document.getElementById('pagination');
const darkModeBtn = document.getElementById('darkModeBtn');

function saveStudents(){ localStorage.setItem('students', JSON.stringify(students)); }

function getStatus(score){ return score>=50 ? 'Pass' : 'Fail'; }

function renderStudents(list = students){
  // Pagination
  const start = (currentPage-1)*perPage;
  const paginated = list.slice(start, start+perPage);
  
  studentList.innerHTML = '';
  paginated.forEach(student => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.grade}</td>
      <td>${student.score}</td>
      <td class="${getStatus(student.score)=='Pass' ? 'status-pass':'status-fail'}">${getStatus(student.score)}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editStudent('${student.id}')">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent('${student.id}')">Delete</button>
      </td>
    `;
    studentList.appendChild(tr);
  });

  // Pagination buttons
  const totalPages = Math.ceil(list.length/perPage);
  paginationDiv.innerHTML = '';
  for(let i=1;i<=totalPages;i++){
    const btn = document.createElement('button');
    btn.textContent=i;
    btn.className='page-btn'+(i===currentPage?' active':'');
    btn.onclick=()=>{ currentPage=i; renderStudents(list); };
    paginationDiv.appendChild(btn);
  }
}

// CRUD
studentForm.addEventListener('submit', e=>{
  e.preventDefault();
  const id=document.getElementById('studentId').value;
  const name=document.getElementById('name').value.trim();
  const age=document.getElementById('age').value.trim();
  const grade=document.getElementById('grade').value.trim();
  const score=parseInt(document.getElementById('score').value);

  if(!name||!age||!grade||isNaN(score)) return;

  if(id){
    const index=students.findIndex(s=>s.id===id);
    students[index]={id,name,age,grade,score};
  }else{
    students.push({id:Date.now().toString(),name,age,grade,score});
  }
  saveStudents();
  renderStudents();
  studentForm.reset();
  document.getElementById('studentId').value='';
});

// Edit
function editStudent(id){
  const s=students.find(st=>st.id===id);
  document.getElementById('studentId').value=s.id;
  document.getElementById('name').value=s.name;
  document.getElementById('age').value=s.age;
  document.getElementById('grade').value=s.grade;
  document.getElementById('score').value=s.score;
}

// Delete
function deleteStudent(id){
  if(confirm('Delete this student?')){
    students=students.filter(s=>s.id!==id);
    saveStudents();
    renderStudents();
  }
}

// Search
searchInput.addEventListener('input', e=>{
  const query=e.target.value.toLowerCase();
  const filtered=students.filter(s=>
    s.name.toLowerCase().includes(query) ||
    s.grade.toLowerCase().includes(query)
  );
  currentPage=1;
  renderStudents(filtered);
});

// Sorting
function sortStudents(by){
  students.sort((a,b)=>{
    if(by==='name'||by==='grade') return a[by].localeCompare(b[by]);
    else return a[by]-b[by];
  });
  renderStudents();
}

// Dark mode
darkModeBtn.addEventListener('click', ()=>{
  document.body.classList.toggle('dark-mode');
});

// Initial render
renderStudents();
