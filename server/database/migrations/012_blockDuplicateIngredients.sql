-- Basic constraint, doesn't work when measurement is null yet
ALTER TABLE ingredient
ADD CONSTRAINT uniqueUserIngredient
UNIQUE (name, measurement, userId)