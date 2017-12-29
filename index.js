$(function() {

    var $noteText = $('#note-text');
    var $noteSave = $('#note-save');
    var $noteTable = $('#note-table');

    var counter = 0;
    var notes = {};

    $noteSave.click(function(e) {
        e.preventDefault();
        var text = getNoteText();
        if (text) {
            var note = createNote(text);
            saveNote(note);
            appendRow(note);
            clearFields();
        }
    });

    $noteTable.on('click', 'button.remove-note', function() {
        var row = $(this).parent().parent();
        var id = $(this).data().id;
        delete notes[id];
        row.fadeOut('normal', function() {
            $(this).remove();
        });
    });

    function getNoteText() {
        var text = $noteText.val().trim();

        if (!text.length) {
            alert('Debe ingresar una nota');
            return;
        }

        return text;
    }

    function createNote(text) {
        return {
            id: ++counter,
            text: text
        };
    }

    function saveNote(note) {
        notes[note.id] = note;
    }

    function appendRow(note) {
        var actions = '<td><button class="remove-note" data-id="' + note.id + '">Eliminar</button></td>';
        var row = $('<tr><td>' + note.id + '</td><td>' + note.text + '</td>' + actions + '</tr>');
        row.hide();
        $noteTable.find('tbody').append(row);
        row.show('slow');
    }

    function clearFields() {
        $noteText.val('');
        $noteText.focus();
    }

});