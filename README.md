# web-tech FMI project - Vote for meeting (Doodle)

- **Dependency Graph:**  
  ```  
             DB schema (Olya)  
                    ↓  
             Server API (Stoyan)  
                ↙       ↘
              ↙           ↘
            ↙               ↘
  DateTimePicker (Lidia)   VoteSummaryList (Rossy)  
                         ↑  
                    Auth (Dimitar) (uses authMiddleware by Server)
  ```  
  This shows how schema → server → frontend and auth all plug together.  

* *DB schema* (Olya) is the foundation.
* *Server* (Stoyan) uses the schema.
* *Auth* (Dimitar) also uses the schema and plugs into the server.
* *FE* (Rossy + Lidia) can start with mocks but ultimately depend on the server APIs.


View our kanban project page: [webtech-doodle kanban](https://github.com/users/StoyanTinchev/projects/4/views/1)

View our milestones page: [webtech-doodle milestones](https://github.com/StoyanTinchev/webtech-doodle/milestones)

Issues page: [webtech-doodle issues](https://github.com/StoyanTinchev/webtech-doodle/issues)

<br>

### BE collection:
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/18232984-f5e2fabc-ee21-49b0-813b-09b8604789c3?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D18232984-f5e2fabc-ee21-49b0-813b-09b8604789c3%26entityType%3Dcollection%26workspaceId%3D88307bb5-6f2e-4592-92ba-2ee82e613e21)