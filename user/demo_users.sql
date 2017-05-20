


-- INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('managerh'  , 'managerh'  , 'Hiring Manager' , 'A', 'ac.core', 'hiring.manager@client.com' , 'V', 10000, '8d032359ae8ba0640d65604ddf80ef64189ced07d9d1338a628137ed05db694e37a35dd9de74397ecd6de2f2723d5ef3743b73ea226fd01bbb01e9248a75dd5b', '04527a02df1eccd6bd9f25f294f6196632ba727adbffeb8a348c54c33d18b8cc45f5e255f31dac393fdc3066dc930a6a8a039ae303c9e35044587550bd41a835');
-- Convert abramspa to Hiring Manager
UPDATE ac_user SET id = 'managerh', _key = 'managerh', name = 'Hiring Manager', email = 'hiring.manager@client.com',
		pswd_pbkdf = '8d032359ae8ba0640d65604ddf80ef64189ced07d9d1338a628137ed05db694e37a35dd9de74397ecd6de2f2723d5ef3743b73ea226fd01bbb01e9248a75dd5b',
		salt = '04527a02df1eccd6bd9f25f294f6196632ba727adbffeb8a348c54c33d18b8cc45f5e255f31dac393fdc3066dc930a6a8a039ae303c9e35044587550bd41a835'
 WHERE id = 'abramspa';
UPDATE ac_user_role SET user_id = 'managerh', _key = CONCAT(user_id, '.', role_id) WHERE user_id = 'abramspa';
UPDATE rm_rsrc SET user_id = 'managerh', name = 'Hiring Manager', first_name = 'Hiring', last_name = 'Manager', email = 'hiring.manager@client.com' WHERE user_id = 'abramspa';


-- Convert adkinsle to Approver
UPDATE ac_user SET id = 'approver', _key = 'approver', name = 'Approver', email = 'approver@client.com',
		pswd_pbkdf = '8d032359ae8ba0640d65604ddf80ef64189ced07d9d1338a628137ed05db694e37a35dd9de74397ecd6de2f2723d5ef3743b73ea226fd01bbb01e9248a75dd5b',
		salt = '04527a02df1eccd6bd9f25f294f6196632ba727adbffeb8a348c54c33d18b8cc45f5e255f31dac393fdc3066dc930a6a8a039ae303c9e35044587550bd41a835'
 WHERE id = 'adkinsle';
UPDATE ac_user_role SET user_id = 'approver', _key = CONCAT(user_id, '.', role_id) WHERE user_id = 'adkinsle';
UPDATE rm_rsrc SET user_id = 'approver', name = 'Approver', first_name = 'Approver', last_name = 'Approver', email = 'approver@client.com' WHERE user_id = 'adkinsle';


-- Convert conestev to Candidate
UPDATE ac_user SET id = 'candidat', _key = 'candidat', name = 'Candidate', email = 'candidate@hotmail.com',
		pswd_pbkdf = '8d032359ae8ba0640d65604ddf80ef64189ced07d9d1338a628137ed05db694e37a35dd9de74397ecd6de2f2723d5ef3743b73ea226fd01bbb01e9248a75dd5b',
		salt = '04527a02df1eccd6bd9f25f294f6196632ba727adbffeb8a348c54c33d18b8cc45f5e255f31dac393fdc3066dc930a6a8a039ae303c9e35044587550bd41a835'
 WHERE id = (SELECT R.home_user_id FROM rm_rsrc R, vc_sbm S WHERE R._key = S.rsrc AND S._key = '1.5');
UPDATE ac_user_role SET user_id = 'candidat', _key = CONCAT(user_id, '.', role_id) WHERE user_id =
		    (SELECT R.home_user_id FROM rm_rsrc R, vc_sbm S WHERE R._key = S.rsrc AND S._key = '1.5');
UPDATE rm_rsrc SET home_user_id = 'candidat', name = 'Candidate', first_name = 'Candidate', last_name = 'Candidate', email = 'candidate@hotmail.com' WHERE home_user_id =
			(SELECT rsrc FROM vc_sbm WHERE _key = '1.5');


-- Convert tilleyje to Recruitment Manager
UPDATE ac_user SET id = 'managerr', _key = 'managerr', name = 'Recruitment Manager', email = 'recruitment.manager@client.com',
		pswd_pbkdf = '8d032359ae8ba0640d65604ddf80ef64189ced07d9d1338a628137ed05db694e37a35dd9de74397ecd6de2f2723d5ef3743b73ea226fd01bbb01e9248a75dd5b',
		salt = '04527a02df1eccd6bd9f25f294f6196632ba727adbffeb8a348c54c33d18b8cc45f5e255f31dac393fdc3066dc930a6a8a039ae303c9e35044587550bd41a835'
 WHERE id = 'tilleyje';
UPDATE ac_user_role SET user_id = 'managerr', _key = CONCAT(user_id, '.', role_id) WHERE user_id = 'tilleyje';
UPDATE rm_rsrc SET user_id = 'managerr', name = 'Recruitment Manager', first_name = 'Recruitment', last_name = 'Manager', email = 'approver@client.com' WHERE user_id = 'tilleyje';

