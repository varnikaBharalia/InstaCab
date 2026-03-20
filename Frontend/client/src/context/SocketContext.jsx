
// // // // // // import React, { createContext, useEffect } from 'react';
// // // // // // import { io } from 'socket.io-client';

// // // // // // // eslint-disable-next-line react-refresh/only-export-components
// // // // // // export const SocketContext = createContext();

// // // // // // // const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL
// // // // // // const socket = io(import.meta.env.VITE_BASE_URL, {
// // // // // //     auth: {
// // // // // //         token: localStorage.getItem("token")
// // // // // //     },
// // // // // //     transports: ["websocket"] // optional but stable
// // // // // // });


// // // // // // const SocketProvider = ({ children }) => {
// // // // // //     useEffect(() => {
// // // // // //         // Basic connection logic
// // // // // //         socket.on('connect', () => {
// // // // // //             console.log('Connected to server');
// // // // // //         });

// // // // // //         socket.on('disconnect', () => {
// // // // // //             console.log('Disconnected from server');
// // // // // //         });

// // // // // //     }, []);




// // // // // //     return (
// // // // // //         <SocketContext.Provider value={{ socket }}>
// // // // // //             {children}
// // // // // //         </SocketContext.Provider>
// // // // // //     );
// // // // // // };

// // // // // // export default SocketProvider;


// // // // // import React, { createContext, useEffect, useState } from 'react';
// // // // // import { io } from 'socket.io-client';

// // // // // export const SocketContext = createContext();

// // // // // const SocketProvider = ({ children }) => {

// // // // //     const [socket, setSocket] = useState(null);

// // // // //     useEffect(() => {
// // // // //         const token = localStorage.getItem("token");

// // // // //         // 🚨 Do not connect if token is missing
// // // // //         if (!token) {
// // // // //             console.log("No token found, socket not connected");
// // // // //             return;
// // // // //         }

// // // // //         const newSocket = io(import.meta.env.VITE_BASE_URL, {
// // // // //             auth: { token },
// // // // //             transports: ["websocket"]
// // // // //         });

// // // // //         newSocket.on('connect', () => {
// // // // //             console.log('✅ Connected to server');
// // // // //         });

// // // // //         newSocket.on('connect_error', (err) => {
// // // // //             console.log('❌ Socket Error:', err.message);
// // // // //         });

// // // // //         newSocket.on('disconnect', () => {
// // // // //             console.log('Disconnected');
// // // // //         });

// // // // //         setSocket(newSocket);

// // // // //         return () => {
// // // // //             newSocket.disconnect();
// // // // //         };

// // // // //     }, []);

// // // // //     return (
// // // // //         <SocketContext.Provider value={{ socket }}>
// // // // //             {children}
// // // // //         </SocketContext.Provider>
// // // // //     );
// // // // // };

// // // // // export default SocketProvider;


// // // // import React, { createContext, useEffect, useRef, useState } from 'react';
// // // // import { io } from 'socket.io-client';

// // // // export const SocketContext = createContext();

// // // // const SocketProvider = ({ children }) => {

// // // //     const [socket, setSocket] = useState(null);
// // // //     const socketRef = useRef(null); // 🚨 prevents multiple connections

// // // //     useEffect(() => {
// // // //         const token = localStorage.getItem("token");

// // // //         // 🚫 Do NOT connect without token
// // // //         if (!token) {
// // // //             console.log("❌ No token → socket not connecting");
// // // //             return;
// // // //         }

// // // //         // 🚫 Prevent duplicate connection (React Strict Mode fix)
// // // //         if (socketRef.current) return;

// // // //         // const newSocket = io(import.meta.env.VITE_BASE_URL, {
// // // //         //     auth: { token },
// // // //         //     transports: ["websocket"]
// // // //         // });

// // // //         const newSocket = io(import.meta.env.VITE_BASE_URL, {
// // // //             auth: { token },
// // // //             extraHeaders: {
// // // //                 token: token
// // // //             },
// // // //             transports: ["websocket"]
// // // //         });
// // // //         socketRef.current = newSocket; // store reference
// // // //         setSocket(newSocket);

// // // //         newSocket.on('connect', () => {
// // // //             console.log('✅ Connected to server');
// // // //         });

// // // //         newSocket.on('connect_error', (err) => {
// // // //             console.log('❌ Socket Error:', err.message);
// // // //         });

// // // //         newSocket.on('disconnect', () => {
// // // //             console.log('Disconnected');
// // // //         });

// // // //         return () => {
// // // //             newSocket.disconnect();
// // // //             socketRef.current = null;
// // // //         };

// // // //     }, []);

// // // //     return (
// // // //         <SocketContext.Provider value={{ socket }}>
// // // //             {children}
// // // //         </SocketContext.Provider>
// // // //     );
// // // // };

// // // // export default SocketProvider;



// // // import React, { createContext, useEffect, useRef } from 'react';
// // // import { io } from 'socket.io-client';

// // // // eslint-disable-next-line react-refresh/only-export-components
// // // export const SocketContext = createContext();

// // // const SocketProvider = ({ children }) => {

// // //     const socketRef = useRef(null); // ✅ no re-render

// // //     useEffect(() => {
// // //         const token = localStorage.getItem("token");

// // //         if (!token) {
// // //             console.log("❌ No token → socket not connecting");
// // //             return;
// // //         }

// // //         // prevent multiple connections
// // //         if (socketRef.current) return;

// // //         const socket = io(import.meta.env.VITE_BASE_URL, {
// // //             auth: { token },
// // //             query: { token }, // 🔥 important for your backend
// // //             transports: ["websocket"]
// // //         });

// // //         socketRef.current = socket;

// // //         socket.on('connect', () => {
// // //             console.log('✅ Connected to server');
// // //         });

// // //         socket.on('connect_error', (err) => {
// // //             console.log('❌ Socket Error:', err.message);
// // //         });

// // //         socket.on('disconnect', () => {
// // //             console.log('Disconnected');
// // //         });

// // //         return () => {
// // //             socket.disconnect();
// // //             socketRef.current = null;
// // //         };

// // //     }, []);

// // //     return (
// // //         <SocketContext.Provider value={{ socket: socketRef.current }}>
// // //             {children}
// // //         </SocketContext.Provider>
// // //     );
// // // };

// // // export default SocketProvider;


// // import React, { createContext, useEffect, useRef, useState } from 'react';
// // import { io } from 'socket.io-client';

// // export const SocketContext = createContext();

// // const SocketProvider = ({ children }) => {

// //     const socketRef = useRef(null);
// //     const [socket, setSocket] = useState(null); // ✅ safe for render

// //     useEffect(() => {
// //         const token = localStorage.getItem("token");

// //         // if (!token) {
// //         //     console.log("❌ No token → socket not connecting");
// //         //     return;
// //         // }
// //  if (!token) {
// //             console.log("⏳ Waiting for token...");
// //             setTimeout(connectSocket, 500); // retry
// //             return;
// //         }
// //         if (socketRef.current) return;

// //         const newSocket = io(import.meta.env.VITE_BASE_URL, {
// //             auth: { token },
// //             query: { token }, // important for your backend
// //             transports: ["websocket"]
// //         });

// //         socketRef.current = newSocket;

// //         // ✅ set state AFTER creation (one-time)
// //         setSocket(newSocket);

// //         newSocket.on('connect', () => {
// //             console.log('✅ Connected to server');
// //         });

// //         newSocket.on('connect_error', (err) => {
// //             console.log('❌ Socket Error:', err.message);
// //         });

// //         newSocket.on('disconnect', () => {
// //             console.log('Disconnected');
// //         });

// //         return () => {
// //             newSocket.disconnect();
// //             socketRef.current = null;
// //         };

// //     }, []);

// //     return (
// //         <SocketContext.Provider value={{ socket }}>
// //             {children}
// //         </SocketContext.Provider>
// //     );
// // };

// // export default SocketProvider;



// import React, { createContext, useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext();

// const SocketProvider = ({ children }) => {

//     const socketRef = useRef(null);
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {

//         const connectSocket = () => {
//             const token = localStorage.getItem("token");

//             if (!token) {
//                 console.log("⏳ Waiting for token...");
//                 setTimeout(connectSocket, 500); // ✅ retry correctly
//                 return;
//             }

//             if (socketRef.current) return;

//             const newSocket = io(import.meta.env.VITE_BASE_URL, {
//                 auth: { token },
//                 query: { token },
//                 transports: ["websocket"]
//             });

//             socketRef.current = newSocket;
//             setSocket(newSocket);

//             newSocket.on('connect', () => {
//                 console.log('✅ Connected to server');
//             });

//             newSocket.on('connect_error', (err) => {
//                 console.log('❌ Socket Error:', err.message);
//             });

//             newSocket.on('disconnect', () => {
//                 console.log('Disconnected');
//             });
//         };

//         connectSocket(); // ✅ start the process

//         return () => {
//             if (socketRef.current) {
//                 socketRef.current.disconnect();
//                 socketRef.current = null;
//             }
//         };

//     }, []);

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export default SocketProvider;


import React, { createContext, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {

    const socketRef = useRef(null);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("❌ No token → socket not connected");
            return;
        }

        // ✅ prevent multiple connections
        if (socketRef.current) return;

        const newSocket = io(import.meta.env.VITE_BASE_URL, {
            auth: { token },
            transports: ["websocket"],
            reconnection: true,          // ✅ auto reconnect
            reconnectionAttempts: 5,     // optional
            reconnectionDelay: 1000
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('✅ Connected:', newSocket.id);
        });

        newSocket.on('connect_error', (err) => {
            console.log('❌ Socket Error:', err.message);
        });

        newSocket.on('disconnect', (reason) => {
            console.log('⚠️ Disconnected:', reason);
        });

        return () => {
            // ❌ DON'T DISCONNECT on every render
            // Only disconnect if really needed
        };

    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;