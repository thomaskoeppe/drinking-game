let _PLAYERS = {};
let _QUESTIONS = {};
let currentPlayer = null;

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
    console.log(str, c);

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

const nextQuestion = (element, skipped = false) => {
    const question = getRandomQuestion();
    const player = getRandomPlayer(-1);

    if (currentPlayer) {
        currentPlayer.skipped = skipped ? currentPlayer.skipped + 1 : currentPlayer.skipped;
    }

    currentPlayer = null;

    if (!question) {
        $('.card').eq(1).fadeOut(1000, () => {
            $('table tbody').html(`
                ${Object.keys(_PLAYERS).map((key) => `
                    <tr>
                        <td>${_PLAYERS[key].name}</td>
                        <td>${_PLAYERS[key].skipped}</td>
                    </tr>
                `).join('')}
            `);

            $('.card').last().fadeIn(1000);

            tsParticles.load({
                id: "tsparticles",
                options: {
                    "fullScreen": {
                    "zIndex": -1
                    },
                    "particles": {
                    "number": {
                        "value": 0
                    },
                    "color": {
                        "value": [
                        "#00FFFC",
                        "#FC00FF",
                        "#fffc00"
                        ]
                    },
                    "shape": {
                        "type": [
                        "circle",
                        "square",
                        "triangle",
                        "polygon"
                        ],
                        "options": {
                        "polygon": [
                            {
                            "sides": 5
                            },
                            {
                            "sides": 6
                            }
                        ]
                        }
                    },
                    "opacity": {
                        "value": {
                        "min": 0,
                        "max": 1
                        },
                        "animation": {
                        "enable": true,
                        "speed": 2,
                        "startValue": "max",
                        "destroy": "min"
                        }
                    },
                    "size": {
                        "value": {
                        "min": 2,
                        "max": 4
                        }
                    },
                    "links": {
                        "enable": false
                    },
                    "life": {
                        "duration": {
                        "sync": true,
                        "value": 5
                        },
                        "count": 1
                    },
                    "move": {
                        "enable": true,
                        "gravity": {
                        "enable": true,
                        "acceleration": 10
                        },
                        "speed": {
                        "min": 10,
                        "max": 20
                        },
                        "decay": 0.1,
                        "direction": "none",
                        "straight": false,
                        "outModes": {
                        "default": "destroy",
                        "top": "none"
                        }
                    },
                    "rotate": {
                        "value": {
                        "min": 0,
                        "max": 360
                        },
                        "direction": "random",
                        "move": true,
                        "animation": {
                        "enable": true,
                        "speed": 60
                        }
                    },
                    "tilt": {
                        "direction": "random",
                        "enable": true,
                        "move": true,
                        "value": {
                        "min": 0,
                        "max": 360
                        },
                        "animation": {
                        "enable": true,
                        "speed": 60
                        }
                    },
                    "roll": {
                        "darken": {
                        "enable": true,
                        "value": 25
                        },
                        "enable": true,
                        "speed": {
                        "min": 15,
                        "max": 25
                        }
                    },
                    "wobble": {
                        "distance": 30,
                        "enable": true,
                        "move": true,
                        "speed": {
                        "min": -15,
                        "max": 15
                        }
                    }
                    },
                    "emitters": {
                    "life": {
                        "count": 0,
                        "duration": 0.1,
                        "delay": 0.4
                    },
                    "rate": {
                        "delay": 0.1,
                        "quantity": 150
                    },
                    "size": {
                        "width": 0,
                        "height": 0
                    }
                    }
                }
            });
        });

        return;
    }

    currentPlayer = player;

    if (element) {
        const card = $(element).closest('.card');

        card.animate({ top: '-100%' }, 500, () => {
            card.find('.card-title').html(replaceStringPlaceholders(question.question, {
                player: player.name,
                amount: question.amount,
                target: question.target ? getRandomPlayer(Object.values(_PLAYERS).indexOf(player)).name : null
            }));

            card.find('.card-text').html(question.answer != null ? replaceStringPlaceholders(question.answer, {
                player: player.name,
                amount: question.amount,
                target: question.target ? getRandomPlayer(Object.values(_PLAYERS).indexOf(player)).name : null
            }) : "");
        
            _QUESTIONS.splice(Object.keys(_QUESTIONS).indexOf(question), 1);

            card.css('top', '100%');
            card.animate({ top: '0%' }, 500);
        });
    } else {
        const card = $('.card').eq(1);

        card.fadeIn(1000);
        card.find('.card-title').html(replaceStringPlaceholders(question.question, {
            player: player.name,
            amount: question.amount,
            target: question.target ? getRandomPlayer(Object.values(_PLAYERS).indexOf(player)).name : null
        }));

        card.find('.card-text').html(question.answer != null ? replaceStringPlaceholders(question.answer, {
            player: player.name,
            amount: question.amount,
            target: question.target ? getRandomPlayer(Object.values(_PLAYERS).indexOf(player)).name : null
        }) : "");

        _QUESTIONS.splice(Object.keys(_QUESTIONS).indexOf(question), 1);
    }
};

const newGame = () => {
    $('.card').last().fadeOut(1000, () => {
        $("#tsparticles").remove();
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