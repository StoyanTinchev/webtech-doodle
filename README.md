# web-tech FMI project - Vote for meeting (Doodle)

- **Dependency Graph:**  
```
DB schema (Olya) ─► Server (Stoyan) ─► FE (Rossy + Lidia)
     │                    ↙
     │                  ↙
     │                ↙ (authMiddleware used by Server)
     │              ↙
     └────► Auth (Dimitar)
```
  This shows how schema → server → frontend and auth all plug together.  

* *DB schema* (Olya) is the foundation.
* *Server* (Stoyan) uses the schema.
* *Auth* (Dimitar) also uses the schema and plugs into the server.
* *FE* (Rossy + Lidia) can start with mocks but ultimately depend on the server APIs.


View our kanban project page: [webtech-doodle kanban](https://github.com/users/StoyanTinchev/projects/4/views/1)

View our milestones page: [webtech-doodle milestones](https://github.com/StoyanTinchev/webtech-doodle/milestones)

Issues page: [webtech-doodle issues](https://github.com/StoyanTinchev/webtech-doodle/issues)
