package appsetup

app {
    sidebar = [
        [title: 'Org section', icon: 'mdi mdi-id-card', children: [[title: 'Org', href: '/org', children: [['title': 'test']]]]],
        [title: 'User section', icon: 'mdi mdi-id-card', children: [[title: 'User', href: '/user']]]
    ]
}

screens {
    defaultActions {
        open {
            enabled = false
            label = "Open"
            icon = "fa fa-eye-open"
            ngClick = "show()"
            row {
                enabled = false
                ngClick = "showRow()"
            }

            show {

            }
        }
    }
    org {
        list {
            fields = ["*"]
            gridz = {
                colModel = [
                    [name: 'id', label: 'ID', width: 30, fixed: true, formatter: 'showActionLink', summaryType: 'sum'],
                    [name: 'name', label: 'Name (right aligned)', width: 150, fixed: true, formatter: 'showLink'],
                    [name: 'name', label: 'Name', width: 100, fixed: true, formatter: 'showActionLink'],
                    [name: 'num', label: 'Num', width: 70],
                    [name: 'addressDate', label: 'Address date', width: 100],
                    [name: 'timeZone', label: 'Time Zone', width: 100]
                ]

                return [
                    colModel   : colModel,
                    shrinkToFit: true,
                    multiselect: true,

                    pager      : true,
                    sortname   : "id",
                    sortorder  : "asc"
                ]
            }
        }

    }
    orgApi {
        list {
            fields = ["*"]
            gridz = {
                colModel = [
                    [name: 'id', label: 'ID', width: 30, fixed: true, formatter: 'showActionLink', summaryType: 'sum'],
                    [name: 'name', label: 'Name (right aligned)', width: 150, fixed: true, formatter: 'showLink'],
                    [name: 'name', label: 'Name', width: 100, fixed: true, formatter: 'showActionLink'],
                    [name: 'num', label: 'Num', width: 70],
                    [name: 'addressDate', label: 'Address date', width: 100],
                    [name: 'timeZone', label: 'Time Zone', width: 100]
                ]

                return [
                    colModel   : colModel,
                    shrinkToFit: true,
                    multiselect: true,

                    pager      : true,
                    sortname   : "id",
                    sortorder  : "asc"
                ]
            }
        }

    }
    menu {}
}
