CREATE TRIGGER  update_counter
BEFORE INSERT on products
FOR EACH ROW
BEGIN UPDATE counter_table
SET counter = counter + 1

CREATE TRIGGER verif_maj
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN IF NEW.stock < 0 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Erreur : Le stock ne peut pas être négatif';
    END IF;
END;



CREATE TRIGGER customer_delete_trigger
AFTER DELETE ON customer
FOR EACH ROW
    INSERT INTO customer_history (date_suppression)
    VALUES (NOW());
END;


CREATE TRIGGER check_order_limit
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN 
    IF (SELECT COUNT(*) FROM orders WHERE user_id = NEW.user_id) >= 10 THEN
        SIGNAL SQLSTATE '45000' 
        SET MESSAGE_TEXT = 'Erreur : Le client a atteint la limite maximale de 10 commandes';
    END IF;
END;

