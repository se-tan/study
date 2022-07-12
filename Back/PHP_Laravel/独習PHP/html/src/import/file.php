<head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">
</head>
<?php
// アップロード処理そのものの成否をチェック
if ($_FILES['upfile']['error'] !== UPLOAD_ERR_OK) {
  $msg = [
    UPLOAD_ERR_FORM_SIZE => 'Exceeded MAX_FILE_SIZE limit of HTML.',
    UPLOAD_ERR_PARTIAL => 'Only part of the file has been uploaded.',
    UPLOAD_ERR_NO_FILE => 'The file has not been uploaded.',
    UPLOAD_ERR_NO_TMP_DIR => 'Temporary save folder doesn\'t exist.',
    UPLOAD_ERR_CANT_WRITE => 'Failed to write to disc.',
    UPLOAD_ERR_EXTENSION => 'Upload interrupted by extension module.'
  ];
  $err_msg = $msg[$_FILES['upfile']['error']];
  // 拡張子が許可されたものであるかを判定
} elseif (!in_array(
  strtolower(pathinfo($_FILES['upfile']['name'])['extension']),
  ['gif', 'jpg', 'jpeg', 'png']
)) {
  $err_msg = 'Only images can be uploaded.';
  // ファイルの内容が画像であるかをチェック
} elseif (!in_array(finfo_file(finfo_open(FILEINFO_MIME_TYPE), $_FILES['upfile']['tmp_name']), ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'])) {
  $err_msg = 'The content of the file is not an image.';
  // エラーチェックを終えたら、アップロード処理
} else {
  $src = $_FILES['upfile']['tmp_name'];
  $dest = $_FILES['upfile']['name'];
  if (!move_uploaded_file($src, '/var/www/html/img/' . $dest)) {
    $err_msg = 'Uploading failed.';
  }
}
// エラー発生時はエラーメッセージを表示
if (isset($err_msg)) {
  die('<div class="container fluid"><div class="text-danger display-5 mt-3">' . $err_msg . '</div></div>');
}
// 処理成功時はフォームにリダイレクト
header('Location: http://' . $_SERVER['HTTP_HOST'] . '/src/library.php');
exit();
?>