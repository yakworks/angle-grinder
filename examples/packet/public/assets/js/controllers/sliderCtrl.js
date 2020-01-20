'use strict';

/* Controllers */

app.controller('SliderCtrl', ['$scope',
function ($scope) {
    $scope.value = "50";
    $scope.options = {
        from: 1,
        to: 100,
        step: 1,
        dimension: " km",
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            before: {
                "background-color": "#58748B"
            }, // zone before default value
            after: {
                "background-color": "#58748B"
            } // zone after default value
        }
    };

    $scope.value2 = "30";
    $scope.options2 = {
        from: 0,
        to: 150,
        step: 1,
        dimension: " $",
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            before: {
                "background-color": "#e66b6b"
            }, // zone before default value
            after: {
                "background-color": "#e66b6b"
            } // zone after default value
        }
    };

    $scope.value3 = "70";
    $scope.options3 = {
        from: 10,
        to: 200,
        step: 1,
        dimension: " €",
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            before: {
                "background-color": "#FFB848"
            }, // zone before default value
            after: {
                "background-color": "#804C75"
            } // zone after default value
        }
    };

    $scope.value4 = "70";
    $scope.options4 = {
        from: 1,
        to: 100,
        step: 1,
        dimension: " km",
        scale: [1, '|', 50, '|', 100],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            before: {
                "background-color": "#1FBBA6"
            }, // zone before default value
            after: {
                "background-color": "#1FBBA6"
            } // zone after default value
        }
    };

    $scope.value5 = "50";
    $scope.options5 = {
        from: 0,
        to: 150,
        step: 1,
        dimension: " $",
        scale: [0, '|', 75, '|', 150],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            before: {
                "background-color": "#F58A5C"
            }, // zone before default value
            after: {
                "background-color": "#F58A5C"
            } // zone after default value
        }
    };

    $scope.value6 = "30";
    $scope.options6 = {
        from: 1,
        to: 200,
        step: 1,
        dimension: " €",
        scale: [1, '|', 100, '|', 200],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            before: {
                "background-color": "#00BDCC"
            }, // zone before default value
            after: {
                "background-color": "#5F8295"
            } // zone after default value
        }
    };

    $scope.value7 = "10;15";
    $scope.options7 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " $",
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#5A8770"
            }
        }
    };

    $scope.value8 = "40;90";
    $scope.options8 = {
        from: 0,
        to: 200,
        step: 1,
        dimension: " Km",
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#804C75"
            }
        }
    };

    $scope.value9 = "34;50";
    $scope.options9 = {
        from: 0,
        to: 100,
        step: 1,
        dimension: " €",
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#46b8da"
            }
        }
    };

    $scope.value10 = "10;15";
    $scope.options10 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " €",
        scale: [0, '|', 10, '|', 20, '|', 30, '|', 40],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#58748B"
            }
        }
    };

    $scope.value11 = "5;25";
    $scope.options11 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " Km",
        scale: [0, '|', 10, '|', 20, '|', 30, '|', 40],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#00BDCC"
            }
        }
    };

    $scope.value12 = "20;30";
    $scope.options12 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " €",
        scale: [0, '|', 10, '|', 20, '|', 30, '|', 40],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#C82E29"
            }
        }
    };

    $scope.value13 = "20;30";
    $scope.options13 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " €",
        vertical: true,
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#C82E29"
            }
        }
    };

    $scope.value14 = "10;20";
    $scope.options14 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " Km",
        vertical: true,
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#46b8da"
            }
        }
    };

    $scope.value15 = "10;30";
    $scope.options15 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " $",
        vertical: true,
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#804C75"
            }
        }
    };

    $scope.value16 = "20;30";
    $scope.options16 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " €",
        vertical: true,
        scale: [0, '|', 10, '|', 20, '|', 30, '|', 40],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#C82E29"
            }
        }
    };

    $scope.value17 = "10;20";
    $scope.options17 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " Km",
        vertical: true,
        scale: [0, '|', 10, '|', 20, '|', 30, '|', 40],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#46b8da"
            }
        }
    };

    $scope.value18 = "10;30";
    $scope.options18 = {
        from: 0,
        to: 40,
        step: 1,
        dimension: " $",
        vertical: true,
        scale: [0, '|', 10, '|', 20, '|', 30, '|', 40],
        className: "clip-slider",
        css: {
            background: {
                "background-color": "silver"
            },
            range: {
                "background-color": "#804C75"
            }
        }
    };

}]);
