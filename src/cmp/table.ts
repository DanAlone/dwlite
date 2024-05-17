export const tableStyle1 = {
    table: {
        style: {
            fontFamily: 'Montserrat',
            backgroundColor: '#1B1C1D',
        }
    },
    tableWrapper: {
        style: {
            display: "table",
        },
    },
    responsiveWrapper: {
        style: {
        },
    },
    headCells: {
        style: {
            fontWeight: 700,
        },
        draggingStyle: {
            cursor: "move",
        },
    },
    header: {
        style: {
            backgroundColor: '#1B1C1D',
        },
    },
    subHeader: {
        style: {
            backgroundColor: '#1B1C1D',
        },
    },
    contextMenu: {
        style: {
            fontSize: "11px",
            fontWeight: 400,
            paddingLeft: "16px",
            paddingRight: "8px",
            transform: 'translate3d(0, -100%, 0)',
            transitionDuration: '125ms',
            transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            willChange: 'transform',
        },
        activeStyle: {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    headRow: {
        style: {
            fontSize: '1.3em',
            fontWeight: 600,
            minHeight: "50px",
            wrap: true,
            whiteSpace: 'break-spaces',
            color:'grey',
            backgroundColor: '#1B1C1D',
        }
    },
    striped: {
        style: {
            backgroundColor: 'black',
            color: '#ffffff',
        },
    },
    cells: {
        style: {
            fontWeight: 300,
        },
    },
    rows: {
        style: {
          color: "#ffffff",
          backgroundColor: "#1B1C1D"
        },
        stripedStyle: {
          color: "#ffffff",
          backgroundColor: "black"
        },
        highlightOnHoverStyle: {
            transitionDuration: '0.15s',
            transitionProperty: 'background-color',
            outlineStyle: 'solid',
            outlineWidth: '1px',
            backgroundColor: 'grey',
        },
    },
    expanderButton: {
        style: {
            backgroundColor: 'transparent',
            borderRadius: '2px',
            transition: '0.25s',
            height: '100%',
            width: '100%',
            '&:hover:enabled': {
                cursor: 'pointer',
            },
            '&:disabled': {
            },
            '&:hover:not(:disabled)': {
                cursor: 'pointer',
            },
            '&:focus': {
                outline: 'none',
            },
            svg: {
                margin: 'auto',
            },
        },
    },
};

export const tableStyle2 = {
    table: {
        style: {
            fontFamily: 'Montserrat',
            backgroundColor: '#FFF',
        }
    },
    tableWrapper: {
        style: {
            display: "table",
        },
    },
    responsiveWrapper: {
        style: {
        },
    },
    headCells: {
        style: {
            fontWeight: 700,
        },
        draggingStyle: {
            cursor: "move",
        },
    },
    header: {
        style: {
            backgroundColor: '#FFF',
        },
    },
    subHeader: {
        style: {
            backgroundColor: '#FFF',
        },
    },
    contextMenu: {
        style: {
            fontSize: "18px",
            fontWeight: 400,
            paddingLeft: "16px",
            paddingRight: "8px",
            transform: 'translate3d(0, -100%, 0)',
            transitionDuration: '125ms',
            transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            willChange: 'transform',
        },
        activeStyle: {
            transform: 'translate3d(0, 0, 0)',
        },
    },
    headRow: {
        style: {
            fontSize: '1.3em',
            fontWeight: 600,
            minHeight: "50px",
            wrap: true,
            whiteSpace: 'break-spaces',
            color:'#000',
            backgroundColor: '#f1f1f1',
        }
    },
    striped: {
        style: {
            backgroundColor: 'f2f2f2',
            color: '#000'
        },
    },
    cells: {
        style: {
            fontWeight: 300,
        },
    },
    rows: {
        style: {
          color: "#000",
          backgroundColor: "#f2f2f2",
        },
        stripedStyle: {
          color: "#000",
          backgroundColor: "#fff"
        },
        highlightOnHoverStyle: {
            transitionDuration: '0.15s',
            transitionProperty: 'background-color',
            outlineStyle: 'solid',
            outlineWidth: '1px',
            backgroundColor: 'gray',
            color: 'white',
        },
    },
    expanderButton: {
        style: {
            backgroundColor: 'transparent',
            borderRadius: '2px',
            transition: '0.25s',
            height: '100%',
            width: '100%',
            '&:hover:enabled': {
                cursor: 'pointer',
            },
            '&:disabled': {
            },
            '&:hover:not(:disabled)': {
                cursor: 'pointer',
            },
            '&:focus': {
                outline: 'none',
            },
            svg: {
                margin: 'auto',
            },
        },
    },
};