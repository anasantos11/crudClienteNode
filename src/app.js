function getFormData() {
    var unindexed_array = $('form').serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function cadastrarCliente() {
    $.ajax({
        type: 'POST',
        data: JSON.stringify(getFormData()),
        contentType: 'application/json',
        url: 'http://localhost:3000/cliente',
        success: function (res) {
            console.log(JSON.stringify(res));
            alert(res);
            $('form')[0].reset();
        }, error: function (error) {
            console.log('error');
            console.log(JSON.stringify(error));
        }
    });
}

function listarClientes() {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: 'http://localhost:3000/cliente',
        success: function (res) {
            console.log(JSON.stringify(res));
            showTable(res);
        }, error: function (error) {
            console.log('error');
            console.log(JSON.stringify(error));
        }
    });
}

function showTable(list) {
    list.forEach(element => {
        $('#tbody').append('<tr>');
        $('#tbody').append('<td>' + setNaoInformadoIfIsUndefined(element.cpf) + '</td>');
        $('#tbody').append('<td>' + setNaoInformadoIfIsUndefined(element.identidade) + '</td>');
        $('#tbody').append('<td>' + setNaoInformadoIfIsUndefined(element.nome) + '</td>');
        $('#tbody').append('<td>' + setNaoInformadoIfIsUndefined(element.sobrenome) + '</td>');
        $('#tbody').append('<td>' + setNaoInformadoIfIsUndefined(element.email) + '</td>');
        $('#tbody').append('</tr>');
    });
}

function setNaoInformadoIfIsUndefined(element){
    if(element == undefined)
        return "Não informado";
    else
        return element;
}