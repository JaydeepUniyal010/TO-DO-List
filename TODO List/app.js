const addUserBtn = document.getElementById('addUser');
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('users');

if (objStr != null) {
   userArray = JSON.parse(objStr);
}

DisplayInfo();

addUserBtn.onclick = () => {
   // Get user's name from text field
   const name = usernameTextField.value;
   if (edit_id != null) {
      // Edit action
      userArray.splice(edit_id, 1, {
         'name': name,
         'done': false  // Ensure 'done' property exists
      });
      edit_id = null;
   } else {
      // Insert action
      userArray.push({
         'name': name,
         'done': false  // New tasks are not done by default
      });
   }

   SaveInfo(userArray);
   usernameTextField.value = '';
   addUserBtn.innerText = btnText;
}

// Store user's name and status in local storage
function SaveInfo(userArray) {
   let str = JSON.stringify(userArray);
   localStorage.setItem('users', str);
   DisplayInfo();
}

// Display user's name and status
function DisplayInfo() {
   let statement = '';
   userArray.forEach((user, i) => {
      const checked = user.done ? 'checked' : '';
      statement += `<tr>
           <th scope="row">${i+1}</th>
           <td>${user.name}</td>
           <td><input type="checkbox" ${checked} onclick="ToggleStatus(${i})"></td>
           <td>
             <i class="btn text-white fa fa-edit btn-info mx-2" onclick='EditInfo(${i})'></i>
             <i class="btn btn-danger text-white fa fa-trash" onclick='DeleteInfo(${i})'></i>
           </td>
         </tr>`;
   });
   recordsDisplay.innerHTML = statement;
}

// Toggle task status
function ToggleStatus(id) {
   userArray[id].done = !userArray[id].done;
   SaveInfo(userArray);
}

// Edit user's name
function EditInfo(id) {
   edit_id = id;
   usernameTextField.value = userArray[id].name;
   addUserBtn.innerText = 'Save Changes';
}

// Delete user's name
function DeleteInfo(id) {
   userArray.splice(id, 1);
   SaveInfo(userArray);
}
