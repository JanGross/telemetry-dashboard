<!DOCTYPE html>
<?php include 'head.php' ?>
  <body>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script>google.charts.load('current', {packages: ['corechart', 'line']});</script>
    <header>
      <?php include 'header.php'; ?>
    </header>
    <main>
      <?php
        $pages = Array(""=>"dashboard.php", "dash"=>"dashboard.php", "live"=>"live.php");
        include $pages[$_GET['v']];
      ?>
    </main>
    <?php include 'footer.php'; ?>
    
  </body>
</html>