require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const bats = require('./data.js');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('BatFit Backend Running');
});

app.post("/players", ((req, res) => {
    const player = req.body;
    let highestScore = -1;
    let bestBat = null;
    bats.forEach((bat) => {
        let score = 0;

        const playerBudget = Number(player.budget) || 0;
        const playerHeight = Number(player.height) || 0;
        const batWeight = Number(bat.weight) || 1175;

        if (playerBudget > 0) {
            if (bat.budget <= playerBudget) {
                score += 10;
            } else {
                const overBudgetPercent =
                    ((bat.budget - playerBudget) / playerBudget) * 100;

                if (overBudgetPercent <= 10) {
                    score += 4;
                } else if (overBudgetPercent <= 20) {
                    score += 1;
                } else {
                    score -= 5;
                }
            }
        }

        if (bat.battingApproach === player.battingApproach) {
            score += 7;
        } else if (player.battingApproach === "Balanced") {
            score += 3;
        }

        if (bat.battingStyle === player.battingStyle) {
            score += 6;
        } else if (player.battingStyle === "Balanced") {
            score += 3;
        }

        if (bat.strength === player.strength) {
            score += 6;
        }

        if (bat.playingLevel === player.playingLevel) {
            score += 5;
        } else {
            if (
                player.playingLevel === "Beginner" &&
                bat.playingLevel === "Professional"
            ) {
                score -= 6;
            } else if (
                player.playingLevel === "Professional" &&
                bat.playingLevel === "Club"
            ) {
                score -= 2;
            } else {
                score += 2;
            }
        }

        if (bat.handleShape === player.handleShape) {
            score += 4;
        }

        if (player.weightPreference === "Light") {
            if (batWeight <= 1165) {
                score += 5;
            } else if (batWeight <= 1175) {
                score += 3;
            } else {
                score -= 2;
            }
        } else if (player.weightPreference === "Medium") {
            if (batWeight > 1165 && batWeight <= 1185) {
                score += 5;
            } else {
                score += 2;
            }
        } else if (player.weightPreference === "Heavy") {
            if (batWeight > 1185) {
                score += 5;
            } else if (batWeight > 1175) {
                score += 3;
            } else {
                score -= 2;
            }
        }

        const weakness =
            player.battingWeakness || player.battingweakness;

        if (
            weakness === "Short Ball" &&
            bat.battingStyle === "Back Foot"
        ) {
            score += 4;
        }

        if (
            weakness === "Spin" &&
            bat.battingApproach === "Vertical Bat"
        ) {
            score += 4;
        }

        if (
            weakness === "Swing" &&
            bat.strength === "Defense"
        ) {
            score += 4;
        }

        if (
            weakness === "Yorkers" &&
            batWeight <= 1175
        ) {
            score += 4;
        }

        if (playerHeight > 0) {
            if (playerHeight < 165 && batWeight > 1185) {
                score -= 3;
            }

            if (playerHeight > 185 && batWeight < 1165) {
                score -= 1;
            }
        }

        if (score > highestScore) {
            highestScore = score;
            bestBat = bat;
        }
    });
    res.json(bestBat);
    console.log(player.name);
    console.log(bestBat);
    console.log(highestScore);
}));
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
