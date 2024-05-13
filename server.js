const http = require('http');

const db = [
    { id: 1, title: 'Funny Joke', comedian: 'Layiwasabi', year: 2024 },
    { id: 2, title: 'Hilarious Joke', comedian: 'Basketmouth', year: 2012 }
];

const server = http.createServer((req, res) => {
    let data = '';
    req.on('data', chunk => {
        data += chunk.toString();
    });

    req.on('end', () => {
        if (req.url === '/' && req.method === 'GET') {
            res.writeHead(200);
            res.end(JSON.stringify({ data: db, message: "Data fetched successfully" }));
        }
        else if (req.url === '/' && req.method === 'POST') {
            let body = JSON.parse(data);
            const { title, comedian, year } = body;
            const id = db.length + 1;
            const newJoke = { id, title, comedian, year };
            db.push(newJoke);
            res.writeHead(200);
            res.end(JSON.stringify({ data: db, message: "Data added successfully" }));;
        }
        else if (req.method === 'PATCH' && req.url.startsWith('/joke/')) {
            const id = parseInt(req.url.split('/').pop());
            const { title, comedian, year } = JSON.parse(data);
            const index = db.findIndex(joke => joke.id === id);
            if (index !== -1) {
                db[index] = { id, title, comedian, year };
                res.writeHead(200);
                res.end(JSON.stringify(db[index]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Joke not found' }));
            }
        }
        else if (  req.url.startsWith('/joke/') && req.method === 'DELETE') {
            const id = parseInt(req.url.split('/').pop());
            const index = db.findIndex(joke => joke.id === id);
            if (index !== -1) {
                const deletedJoke = db.splice(index, 1);
                res.writeHead(200, );
                res.end(JSON.stringify(deletedJoke[0]));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'Joke not found' }));
            }
        }
        else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'Route not found' }));
        }
    });

});

server.listen(3000, "127.0.0.1", () => {
    console.log("server running")
});
