const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Line-up web app", version: "1.0.0" },
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, num) => {
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.get("/api/docs.json", (req, res) => {
    res.setHeader("Content-type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Acceso documentacion rutas back-end http://localhost:${num}/api/docs`
  );
};

module.exports = { swaggerDocs };
