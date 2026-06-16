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
    let scorebats = [];

    bats.forEach((bat) => {
        let score = 0;
        let reasons = [];
        const playerBudget = Number(player.budget) || 0;
        const playerHeight = Number(player.height) || 0;
        const batWeight = Number(bat.weight) || 1175;

        if (playerBudget > 0) {
            if (bat.budget <= playerBudget) {
                score += 25;
                reasons.push("Fits within your budget");
            } else {
                const overBudgetPercent =
                    ((bat.budget - playerBudget) / playerBudget) * 100;

                if (overBudgetPercent <= 10) {
                    score += 4;
                    reasons.push("Slightly above budget but still reasonable");
                } else if (overBudgetPercent <= 20) {
                    score += 1;
                } else {
                    score -= 5;
                }
            }
        }

        if (bat.battingApproach === player.battingApproach) {
            score += 10;
            reasons.push(`Matches your ${player.battingApproach} batting approach`);
        } else if (player.battingApproach === "Balanced") {
            score += 5;
        }

        if (bat.battingStyle === player.battingStyle) {
            score += 10;
            reasons.push(`Matches your ${player.battingStyle} batting style`);
        } else if (player.battingStyle === "Balanced") {
            score += 5;
        }

        if (bat.strength === player.strength) {
            score += 6;
            reasons.push(`Suited for ${player.strength}-oriented players`);
        }

        if (bat.playingLevel === player.playingLevel) {
            score += 4;
            reasons.push(`Ideal for ${player.playingLevel} level players`);
        } else {
            if (
                player.playingLevel === "Beginner" &&
                bat.playingLevel === "Professional"
            ) {
                score -= 2;
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
            score += 15;
            reasons.push(`${player.handleShape} handle preference match`);
        }

        if (player.weightPreference === "Light") {
            if (batWeight <= 1165) {
                score += 10;
                reasons.push("Matches your preference for a light bat");
            } else if (batWeight <= 1175) {
                score += 3;
            } else {
                score -= 2;
            }
        }

        else if (player.weightPreference === "Medium") {
            if (batWeight > 1165 && batWeight <= 1185) {
                score += 10;
                reasons.push("Matches your preference for a medium-weight bat");
            } else {
                score += 2;
            }
        }

        else if (player.weightPreference === "Heavy") {
            if (batWeight > 1185) {
                score += 10;
                reasons.push("Matches your preference for a heavier bat");
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
            score += 5;
            reasons.push("Helps against short-pitched bowling");
        }

        if (
            weakness === "Spin" &&
            bat.battingApproach === "Vertical Bat"
        ) {
            score += 5;
            reasons.push("Suitable for playing spin bowling");
        }

        if (
            weakness === "Swing" &&
            bat.strength === "Defense"
        ) {
            score += 5;
            reasons.push("Offers better control against swing bowling");
        }

        if (
            weakness === "Yorkers" &&
            batWeight <= 1175
        ) {
            score += 1;
            reasons.push("Light pickup helps against yorkers");
        }

        if (playerHeight > 0) {
            if (playerHeight < 165 && batWeight > 1185) {
                score -= 1;
            }

            if (playerHeight > 185 && batWeight < 1165) {
                score -= 1;
            }
        }
        scorebats.push({
            ...bat,
            score,
            reasons
        })

    });
    let sortedbats = scorebats.sort((a, b) => b.score - a.score);
    const highestScore = sortedbats[0].score;
    let topthreebats = sortedbats.slice(0, 3).map(bat => ({
        ...bat,
        percentage: Math.round((bat.score / highestScore) * 100)
    }));
    res.json(topthreebats);
    console.log(player.name);
    console.log(topthreebats);
}));
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
