<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lab convertir for en foreach</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />

        <?php
            $cars = array(

                array("Volvo", 22, 18),

                array("BMW", 15, 13),

                array("Saab", 5, 2),

                array("Land Rover", 17, 15)

            );
        ?>
</head>
<body>
    <div class="container mt-5">
        <div class="table-responsive">
            <table class="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col">Marca</th>
                        <th scope="col">Dato 1</th>
                        <th scope="col">Dato 2</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($cars as $car) { 
                            echo "<tr>";
                            foreach ($car as $value) { 
                                echo "<td>" . $value . "</td> "; 
                            }
                            echo "</tr>";
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
    
</body>
</html>