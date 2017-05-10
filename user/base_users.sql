

-- INSERT INTO ac_tx ( id, commit_point, tx_st, user_id, reason_descr, _key ) values ( 0, now(), 'A', 'batch', 'Original Load', 0 );

-- REPLACE INTO sy_user_type ( area, id, _key, title, roles ) VALUES ( 'ac', 'core', 'ac.core', 'Core', 'user' );

DELETE FROM ac_user WHERE user_type = 'ac.core';
DELETE FROM ac_user_role WHERE user_id NOT IN ( SELECT _key FROM ac_user );

INSERT INTO ac_user (_key, id, name, status, user_type, email) VALUES ('batch'    , 'batch'    , 'Batch Run'     , 'A', 'ac.core', 'rsl.support@rullion.co.uk');
INSERT INTO ac_user (_key, id, name, status, user_type, email) VALUES ('guest'    , 'guest'    , 'Guest User'    , 'A', 'ac.core', 'rsl.support@rullion.co.uk');
INSERT INTO ac_user (_key, id, name, status, user_type, email) VALUES ('guest_ext', 'guest_ext', 'Extranet Guest', 'A', 'ac.core', 'rsl.support@rullion.co.uk');
INSERT INTO ac_user (_key, id, name, status, user_type, email) VALUES ('guest_int', 'guest_int', 'Intranet Guest', 'A', 'ac.core', 'rsl.support@rullion.co.uk');
-- old style password
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, password) VALUES ('beastat'  , 'beastat'  , 'Beastall, Tom'    , 'A', 'ac.core', 'tom.beastall@rullion.co.uk'    , 'V', '3562a7e9ac42dd17916cacb2cce8636a');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, password) VALUES ('francis'  , 'francis'  , 'Francis, Steve'   , 'A', 'ac.core', 'stephen.francis@rullion.co.uk' , 'V', '27fdc11a1313095d7c48b9a784a23e12');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, password) VALUES ('haigha'   , 'haigha'   , 'Haigh, Alistair'  , 'A', 'ac.core', 'alistair.haigh@rullion.co.uk'  , 'V', 'b8e9f7f3f3edb836c495af5dfbe02eca');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, password) VALUES ('redfearnj', 'redfearnj', 'Redfearn, Jamie'  , 'A', 'ac.core', 'jamie.redfearn@rullion.co.uk'  , 'V', '99e4882b62a0de04122e09de30fbcecb');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, password) VALUES ('behambar' , 'behambar' , 'Behambari, Julio' , 'A', 'ac.core', 'julio.behambari@rullion.co.uk' , 'V', '4a38ca0a3572eb27961fbfd29f597b76');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, password) VALUES ('finchk'   , 'finchk'   , 'Finch, Kevin'     , 'A', 'ac.core', 'kevin.finch@rullion.co.uk'     , 'V', '1ee161b034d402a39fc4fdb4003f51ad');

-- new style password
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('kurolaj'  , 'kurolaj'  , 'Kurola, Joel'      , 'A', 'ac.core', 'joel.kurola@rullion.co.uk'      , 'V', 10000, '13a0f33b11cd433a7a3313c8baac0a81512167bdf198b387fe5605d7c7297cf051c038cfb1ead31cc1989e3a015ac2450a0dd06781da03f7e50147359bff6fc9', '582161d4abac7f644e40e6b4c0198410c5590602f35d15bba24e3a0da0b65328566bbeeaad65250a0e692b300d44cf56fd4055c43aff2e313712031c480054e9');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('platte'   , 'platte'   , 'Platt, Elizabeth'  , 'A', 'ac.core', 'elizabeth.platt@rullion.co.uk'  , 'V', 10000, 'a037ced87b5c68e1c8fef73504a8a5f69fc4338c06c0418a41fb4c17441385c77c7414341139427313aa4d969c12895570da8c9b85b4bdcfb41964e830824e4e', '92a89dcdae0e0fb1ff6cfeb2fad4616398f0389b73a8ad24a1b20e40f314b79e97ec40ffb6ee700be24ea0a88e42c315d499dcdfb0c55a9abf0fbfe813cdab91');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('apilongom', 'apilongom', 'Apilongo, Manuel'  , 'A', 'ac.core', 'manuel.apilongo@rullion.co.uk'  , 'V', 10000, 'dc83cdce01341d5da3bbe9a335d2526f454ad5a41f7534b19f47298ddc95640af7104ec9b6fc50f5a1c41cde2b69ae94156754a0001038fa5188c712dabc7175', '9e3e6a3369ea69e8283c354b8e37d270f6801f488e6d899f86a7dd71466067012d913943f26d496a21ab2b5ba8bf41edc69c093eb33e0afee7217b5da07fbb9f');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('heapstua' , 'heapstua' , 'Heap, Stuart'      , 'A', 'ac.core', 'stuart.heap@rullion.co.uk'      , 'V', 10000, 'e3984df179900173e0620e46ef120ccfa20f09865e2d232389a24b25de7b21cd27b4518317d5d833f8faf8c765c1e5cdf9e903bf5c7d827579adc3e05bfc0025', 'adb9df67b03f4ae64d18da763cab7ec05a379d01c9c1980a6a2e369eb03b57f42d36f02c3a354b1bd7665fdfb60a79a2e973b162bee31178a2bdf2105cde5bd0');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('sinfiej'  , 'sinfiej'  , 'Sinfield, Joseph'  , 'A', 'ac.core', 'joseph.sinfield@rullion.co.uk'  , 'V', 10000, '1dd1ab244cbbc284f6ead1b978fb20d250367999c9625f22514a28542d94380e5ca93df888c53139acee15111b3cce0f1056d4ca495eb2a99b5acc8859fea49e', '4982228c6f8a42a919269fa17dc06cebcc3f701fa3a39abb111439a7876699009d355fb6e3c310b461e3e90f73022ebe2c228fb254474a173afac8f05d4635bc');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('willias'  , 'willias'  , 'Williams, Samuel'  , 'A', 'ac.core', 'sam.williams@rullion.co.uk'     , 'V', 10000, '14ced1088f224b3264efa0699840e84beeeeee73b8c38a5a1bc7bb1e13b1e405e91e818d644e776fb9be16562c842ff81db066f77d4c0579da547522245ba032', 'cd60e4500a33e1ccff8fa7e054b317c368fb604c48418bddbbc27461c72b0a6db820ed4a11729b70496f74eb0ccc95e366e9f4868d8ffd510099d6fae7b7418a');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('younism' , 'younism'   , 'Younis, Mo'        , 'A', 'ac.core', 'mo.younis@rullion.co.uk'        , 'V', 10000, 'f7dd7ed56e013789369b7a0016a22040899ab00866da20d5d1ce859d2c97c98e4a3568ce5e17d622c269465b95df11c5ad31c166b9cb0fbb4a88c98a19194779', '179de913ff55f4815944b97bd871821378f0906ee2cfcfbf5ada5d0e78b50ef59c6c78368fb3779316ebf2dff87dffb3288cd93b090bf8d4d94758a23c2d5c4f');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('crosbis' , 'crosbis'   , 'Crosbie, Stephanie', 'A', 'ac.core', 'stephanie.crosbie@rullion.co.uk', 'V', 10000, '85ac3deeb4f23533d5cc882e902324a63e38dfd0651050bffe21ae02dc7f33f5776b89f7c58a779dfc9b108a73a70729aa34eb463fb4d60dc15915d3b8846a11', 'b2af01e86c69dcc32ffb2c67576ab3fc41a9a72ba09e12052d0a6d453e41404f82bb5667e8c9647e5432396a46e0065853abd00bde233a557b8ec0883913a2d6');
INSERT INTO ac_user (_key, id, name, status, user_type, email, email_verification, iterations, pswd_pbkdf, salt) VALUES ('richarr' , 'richarr'   , 'Richardson, Rosie' , 'A', 'ac.core', 'rosie.richardson@rullion.co.uk' , 'V', 10000, 'd2d9d9b9d49fe7b12968c71a5ad6d7245f10d52d352708bf20c0d2242be0c07e5ddf400435b856d29a3595de410eb2301962edee0855657a6ffbcfe4534955ec', '6218f56515c48ad6d695b9337f568c4fef3ab190e49fb5d4e48448e354ff6a6eec106ae3a22df9f27cb8fc5101f2ae6789bb154a33230ce53ba3e5d523b7c05d');




INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'batch', 'sysmgr', 'batch.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'guest', 'guest' , 'guest.guest' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'guest_ext', 'guest_extranet', 'guest_ext.guest_extranet' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'guest_int', 'guest_intranet', 'guest_int.guest_intranet' );

INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'apilongom', 'user'  , 'apilongom.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'apilongom', 'sysmgr', 'apilongom.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'beastat'  , 'user'  , 'beastat.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'beastat'  , 'sysmgr', 'beastat.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'behambar' , 'user'  , 'behambar.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'behambar' , 'sysmgr', 'behambar.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'finchk'   , 'sysmgr', 'finchk.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'finchk'   , 'user'  , 'finchk.user');

INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'francis'  , 'user'  , 'francis.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'francis'  , 'sysmgr', 'francis.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'haigha'   , 'user'  , 'haigha.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'haigha'   , 'sysmgr', 'haigha.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'kurolaj'  , 'user'  , 'kurolaj.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'kurolaj'  , 'sysmgr', 'kurolaj.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'platte'   , 'user'  , 'platte.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'platte'   , 'sysmgr', 'platte.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'redfearnj', 'user'  , 'redfearnj.user' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ( 'redfearnj', 'sysmgr', 'redfearnj.sysmgr' );
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('heapstua', 'sysmgr', 'heapstua.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('heapstua', 'user', 'heapstua.user');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('sinfiej', 'sysmgr', 'sinfiej.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('sinfiej', 'user', 'sinfiej.user');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('willias', 'sysmgr', 'willias.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('willias', 'user', 'willias.user');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('crosbis', 'sysmgr', 'crosbis.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('crosbis', 'user', 'crosbis.user');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('younism', 'sysmgr', 'younism.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('younism', 'user', 'younism.user');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('richarr', 'sysmgr', 'richarr.sysmgr');
INSERT INTO ac_user_role (user_id, role_id, _key) VALUES ('richarr', 'user', 'richarr.user');

