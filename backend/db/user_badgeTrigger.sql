CREATE OR REPLACE FUNCTION user_badges_trigger()
RETURNS TRIGGER AS $$
DECLARE
    highest_badge_id INT;
BEGIN
    -- Find the badge with the highest criteria met by the user
    SELECT badge_id INTO highest_badge_id
    FROM badges
    WHERE badge_criteria <= NEW.number_of_pokemon
    ORDER BY badge_criteria DESC
    LIMIT 1;

    -- If a badge is found, insert it into user_badges
    IF highest_badge_id IS NOT NULL THEN
        -- Delete any existing entry for the user
        DELETE FROM user_badges WHERE user_id = NEW.uid;
        
        -- Insert the new entry
        INSERT INTO user_badges (user_id, badge_id)
        VALUES (NEW.uid, highest_badge_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER trigger_user_badges
AFTER INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION user_badges_trigger();