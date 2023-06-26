

import React from "react";
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import Paper from "@mui/material/Paper";


let RecipesTable = () => {

    let [recipes, setRecipes] = React.useState([]);

    React.useEffect( () => {
        fetch(
            'http://localhost:4000/', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    query: `query ExampleQuery{ 
                        allRecipes {
                            id
                            title
                            ingredients
                            direction
                            user {
                                id
                                name
                            }
                        }
                    }`,
                    variables: {}
                }),
            }
        )
        .then(res => res.json())
        .then(res => {setRecipes((res.data.allRecipes || []))})
    }, [])

    return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Ingredients</TableCell>
                    <TableCell>Instructions</TableCell>
                    <TableCell>User</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    recipes.map(
                        (recipe) => (
                            <TableRow key={recipe.id}>
                                <TableCell>{recipe.id}</TableCell>
                                <TableCell>{recipe.title}</TableCell>
                                <TableCell>{recipe.ingredients}</TableCell>
                                <TableCell>{recipe.direction}</TableCell>
                                <TableCell>{recipe.user.name}</TableCell>
                            </TableRow>
                        )
                    )
                }
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default RecipesTable;