DROP VIEW IF EXISTS getUserPassword;
CREATE VIEW getLoginDetails AS
SELECT userId, `password`, email
FROM user;