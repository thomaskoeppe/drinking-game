let _PLAYERS = {};
let _QUESTIONS = {};

console.log(`Hello ${process.env.HELLO}`);

const addPlayerFormElement = () => {
    $("#players").append(`
        <div class="col-6">
            <div class="input-group">
                <input type="text" class="form-control border-dark bg-light bg-opacity-50" aria-label="Player" placeholder="Player ${$("#players").children().length + 1}" aria-describedby="button-player${$("#players").children().length + 1}">
                <button class="btn btn-outline-dark" type="button" id="button-player${$("#players").children().length + 1}" onclick="removePlayerFormElement(this)"><i class="bi bi-person-x"></i></button>
            </div>
        </div>
    `);

    if ($("#players").children().length > 9) {
        $("#players-add").prop('disabled', true);
    }
};

const removePlayerFormElement = (element) => {
    $(element).closest('.col-6').remove();

    $("#players-add").prop('disabled', false);

    $("#players input").each(function(index) {
        $(this).attr('aria-describedby', `button-player${index + 1}`);
        $(this).closest('.input-group').find('button').attr('id', `button-player${index + 1}`);
        $(this).attr('placeholder', `Player ${index + 1}`);
    });
};

const getRandomQuestion = () => {
    return _QUESTIONS[Math.floor(Math.random() * _QUESTIONS.length)];
}

const removeQuestion = (index) => {
    _QUESTIONS.splice(index, 1);
}

const getRandomPlayer = (oldIndex) => {
    let newIndex = Math.floor(Math.random() * Object.keys(_PLAYERS).length);

    while (newIndex === oldIndex) {
        newIndex = Math.floor(Math.random() * Object.keys(_PLAYERS).length);
    }

    return _PLAYERS[newIndex];
}

const replaceStringPlaceholders = (str, c) => {
    var parts = str.split(/(\$\w+?\$)/g).map(function(v) {
        if (v.startsWith('$') && v.endsWith('$')) {
            if (!c[v.substring(1, v.length - 1)]) {
                return `<span class="text-danger">%MISSING ${v.substring(1, v.length - 1)}%</span>`;
            }

            return c[v.substring(1, v.length - 1)];
        }

        return v;
    });

    return parts.join('');
}

const nextQuestion = (element) => {
    const question = getRandomQuestion();
    const player = getRandomPlayer(-1);

    if (!question) {
        $('.card').eq(1).fadeOut(1000, () => {
            $('.card').last().fadeIn(1000);
        });

        return;
    }

    if (element) {
        const card = $(element).closest('.card');

        card.animate({ top: '-100%' }, 500, () => {
            card.find('.card-title').html(replaceStringPlaceholders(question.question, {
                player: player.name,
                target: question.target ? getRandomPlayer(Object.values(_PLAYERS).indexOf(player)).name : null
            }));
        
            _QUESTIONS.splice(Object.keys(_QUESTIONS).indexOf(question), 1);

            card.css('top', '100%');
            card.animate({ top: '0%' }, 500);
        });
    } else {
        const card = $('.card').eq(1);

        card.fadeIn(1000);
        card.find('.card-title').html(replaceStringPlaceholders(question.question, {
            player: player.name,
            target: question.target ? getRandomPlayer(Object.values(_PLAYERS).indexOf(player)).name : null
        }));

        _QUESTIONS.splice(Object.keys(_QUESTIONS).indexOf(question), 1);
    }
};

const newGame = () => {
    $('.card').last().fadeOut(1000, () => {
        $('.card').first().fadeIn(1000);
    });
}

$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        _PLAYERS = {};
        $('#players input').each(function() {
            if ($(this).val() && $(this).val().trim().length > 0) {
                _PLAYERS[Object.keys(_PLAYERS).length] = {
                    skipped: 0,
                    name: $(this).val().trim()
                }
            }
        });

        if (players.length < 2) {
            $("#players-error").html('<i class="bi bi-exclamation-circle"></i> Please enter at least 2 players.').show();

            return;
        } else {
            $("#players-error").text("").hide();
        }

        $('.card').first().fadeOut(1000, () => {
            $.getJSON('data/drinking-game/default.json', function(data) {
                _QUESTIONS = data;

                nextQuestion(null);
            });
        });
    });
});

window.addPlayerFormElement = addPlayerFormElement;
window.removePlayerFormElement = removePlayerFormElement;
window.nextQuestion = nextQuestion;
window.newGame = newGame;