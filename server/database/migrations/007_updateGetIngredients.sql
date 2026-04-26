CREATE OR REPLACE VIEW getIngredients AS
SELECT ingredientId, name, measurement, userId
FROM ingredient;