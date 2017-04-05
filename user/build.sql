
INSERT INTO sy_list (_key, _tx, area, id, title) VALUES
    ('ac.user_status', null, 'ac', 'user_status', 'User Status'),
    ('ac.email_verification', null, 'ac', 'email_verification', 'Email Verification');


INSERT INTO sy_list_item (_key, _tx, seq_number, list, id, text, active, from_value, to_value) VALUES
    ('ac.user_status.A', null, '20', 'ac.user_status', 'A', 'active', 'A', null, null),
    ('ac.user_status.J', null, '40', 'ac.user_status', 'J', 'rejected', 'I', null, null),
    ('ac.user_status.L', null, '50', 'ac.user_status', 'L', 'locked', 'I', null, null),
    ('ac.user_status.R', null, '10', 'ac.user_status', 'R', 'requested', 'I', null, null),
    ('ac.user_status.S', null, '30', 'ac.user_status', 'S', 'suspended', 'A', null, null),
    ('ac.email_verification.E', null, '10', 'ac.email_verification', 'E', 'entered', 'A', null, null),
    ('ac.email_verification.R', null, '20', 'ac.email_verification', 'R', 'repudiated', 'A', null, null),
    ('ac.email_verification.V', null, '30', 'ac.email_verification', 'V', 'verified', 'A', null, null);
