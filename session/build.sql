
INSERT INTO sy_list (_key, _tx, area, id, title) VALUES
    ('ac.session_status', null, 'ac', 'session_status', 'Session Status');

INSERT INTO sy_list_item (_key, _tx, seq_number, list, id, text, active, from_value, to_value) VALUES
    ('ac.session_status.A', null, '2', 'ac.session_status', 'A', 'active', 'A', null, null),
    ('ac.session_status.C', null, '4', 'ac.session_status', 'C', 'closed', 'A', null, null),
    ('ac.session_status.L', null, '6', 'ac.session_status', 'L', 'logged out', 'A', null, null),
    ('ac.session_status.N', null, '2', 'ac.session_status', 'N', 'not logged in', 'A', null, null),
    ('ac.session_status.Q', null, '7', 'ac.session_status', 'Q', 'purged', 'A', null, null),
    ('ac.session_status.S', null, '8', 'ac.session_status', 'S', 'success', 'A', null, null),
    ('ac.session_status.T', null, '9', 'ac.session_status', 'T', 'purging', 'I', null, null);
