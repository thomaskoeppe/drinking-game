console.log(`Hello ${process.env.HELLO}`);

const addPlayerFormElement = () => {
    $("#players").append(`
        <div class="col-6">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Player" aria-label="Player" aria-describedby="button-player${$("#players").children().length + 1}">
                <button class="btn btn-outline-dark" type="button" id="button-player${$("#players").children().length + 1}" onclick="removePlayerFormElement(this)"><i class="bi bi-person-x"></i></button>
            </div>
        </div>
    `);
};

const removePlayerFormElement = (element) => {
    $(element).closest('.col-6').remove();
};

$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        const players = [];
        $('#players input').each(function() {
            if ($(this).val() && $(this).val().trim().length > 0) {
                players.push($(this).val());
            }
        });

        if (players.length < 2) {
            alert('Please enter at least two players');
            return;
        }

        localStorage.setItem('players', JSON.stringify(players));
        localStorage.setItem('gameMode', 'drinking-game');
        // localStorage.setItem('gameType', $('#gameType').val());

        window.location.href = '/game';
    });
});

window.addPlayerFormElement = addPlayerFormElement;
window.removePlayerFormElement = removePlayerFormElement;