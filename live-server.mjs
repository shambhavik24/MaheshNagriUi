import liveServer from 'live-server';

const params = {
    port: 8081,
    host: "0.0.0.0",
    root: "./build",
    file: "index.html",
    wait: 1000,
};

liveServer.start(params);

