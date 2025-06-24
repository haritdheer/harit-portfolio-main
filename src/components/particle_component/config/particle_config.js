const particleConfig = {
    background: {
        color: {
            value: '#0d203c',
        }
    },
    fpsLimit: 60,
    interactivity: {
        detectsOn: 'canvas',
        events: {
            onClick: {
                enable: true,
                mode: 'push',
            },
            onHover: {
                enable: true,
                mode: 'repulse',
            },
            resize: true,
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
            },
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: '#36a1eb',
        },
        links: {
            color: '#36a1eb',
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 1,
        },
        collisions: {
            enable: true,
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 6,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                value_area: 800,
            },
            value: 80,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: 'circle',
        },
        size: {
            random: true,
            value: 5,
        },
    },
    detectRetina: true,
}

export default particleConfig;