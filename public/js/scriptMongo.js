const addCollection = (items) => {
    items.forEach(item => {
        let itemToAppend = `<li class="collection-item avatar">
        <img src="${item.path}" alt="" class="circle">
        <span class="name" style="color:black">Name: ${item.name}</span>
        <p style="color:black">Country: ${item.country} <br>
        Description: ${item.description}
        </p>
        <a href="#!" class="secondary-content"><i class="material-icons">grade</i></a>
      </li>`;
        $("#collection-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.name = $('#name').val();
    formData.country = $('#country').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postCricketPlayer(formData);
}

function postCricketPlayer(cricketPlayer){
    $.ajax({
        url:'/api/cricket-player',
        type:'POST',
        data:cricketPlayer,
        success: (result)=>{
            if (result.statusCode === 201) {
                alert('Cricket player post successful!');
            }
        }
    });
}

function getAllCricketPlayers(){
    $.get('/api/cricket-players', (response)=>{
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCollection(response.data);
        }
    });
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    $('#formSubmit').click(()=>{
        formSubmitted();
    });
    $('.modal').modal();
    getAllCricketPlayers();
});
