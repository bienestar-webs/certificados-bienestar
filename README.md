# certificados-bienestar

        @keyframes moveUpDown {
            0% {
                top: 0px;
            }
            50% {
                top: 200px;
            }
            100% {
                top: 0px;
            }
        }

        @media screen and (max-width: 1360px) and (min-width: 1360px) and (max-height: 768px) and (min-height: 768px) {
            #certificado-canvas {
                max-width: 350px;
                position: absolute;
                top: 0px;
                border-radius: 5px;
                margin-left: 250px;
                border: 2px solid;
                border-image: linear-gradient(to right, #007bff, #ff0000, #00ff00, #ffff00, #40e0d0, #00008b) 1;
                animation: moveUpDown 4s ease-in-out infinite;
            }
        }
    </style>
</head>
<body>
    <canvas id="certificado-canvas"></canvas>
</body>
</html>
