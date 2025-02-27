import { useEffect, useMemo, useState, type PropsWithChildren } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {loadSlim} from "@tsparticles/slim";
import {useNavigation } from "@remix-run/react";


export default function ParticlesBackground({children} : PropsWithChildren) {
    const [init,setInit] = useState(false);
    const navigation = useNavigation();

    const isNavigating = navigation.state !== "idle";


    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(()=> setInit(true));
    }, []);

    const options = useMemo(()=>({
        key: "images",
        name: "Images",
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "bubble",
                },
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
            },
        },
        particles: {
            color: {
                value: "#ffffff",
            },
            move: {
                enable: true,
                speed: 2,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 80,
            },
            opacity: {
                value: 1,
            },
            rotate: {
                animation: {
                    enable: true,
                    speed: 5,
                    sync: false,
                },
                direction: "random",
                value: {
                    min: 0,
                    max: 360,
                },
            },
            shape: {
                options: {
                    image: [
                        {
                            name: "do-beach",
                        },
                        {
                            name: "do-grey",
                        },
                        {
                            name: "do-lake",
                        },
                        {
                            name: "do-montain",
                        },
                        {
                            name: "do-party",
                        },
                        {
                            name: "do-puerta",
                        },
                        {
                            name: "do-winter",
                        },
                        {
                            name: "do-wood",
                        },
                        {
                            name: "Dsucced",
                        },
                        {
                            name: "grinch",
                        },
                        {
                            name: "Osucced",
                        },
                        {
                            name: "oSucced2",
                        },
                        {
                            name: "pray",
                        }
                    ],
                },
                type: "image",
            },
            size: {
                value: 16,
            },
        },
        background: {
            color: "transparent",
        },
        preload: [
            {
                src: "/assets/images/do-beach.jpeg",
                name: "do-beach",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-grey.jpeg",
                name: "do-grey",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-lake.jpeg",
                name: "do-lake",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-montain.jpeg",
                name: "do-montain",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-party.jpeg",
                name: "do-party",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-puerta.jpeg",
                name: "do-puerta",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-winter.jpeg",
                name: "do-winter",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/do-wood.jpeg",
                name: "do-wood",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/Dsucced.png",
                name: "Dsucced",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/grinch.png",
                name: "grinch",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/Osucced.png",
                name: "Osucced",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/oSucced2.png",
                name: "oSucced2",
                width: 32,
                height: 32,
            },
            {
                src: "/assets/images/pray.png",
                name: "pray",
                width: 32,
                height: 32,
            },
        ],

        })
    ,[]);

    if (init) {
        return (
            <>
                {isNavigating
                    ? <div className="loader"></div>
                    : children
                }
                <Particles
                    options={options}
                />
            </>

        )
    }
    else
        return <div className="loader"></div>;
}