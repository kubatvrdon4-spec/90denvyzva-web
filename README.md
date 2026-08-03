PROPOJENÍ AI ASISTENTA S GOOGLE TABULKOU

Tabulka:
https://docs.google.com/spreadsheets/d/1q2-PJakURdg-CxOEYcaFJg3P-z_o-bNkX8Bv2CnfJiA/edit

1. V tabulce klikněte na Rozšíření → Apps Script.
2. Smažte výchozí obsah souboru Code.gs.
3. Vložte celý obsah souboru google-apps-script/Code.gs a uložte.
4. Vlevo otevřete Nastavení projektu → Vlastnosti skriptu.
5. Přidejte vlastnost CHAT_LOG_SECRET a jako hodnotu použijte vlastní dlouhý
   tajný řetězec. Stejnou hodnotu později vložíte do Vercelu.
6. V editoru spusťte funkci setup a potvrďte oprávnění Google.
7. Klikněte Nasadit → Nové nasazení → Webová aplikace.
8. Spouštět jako: Já. Přístup: Kdokoli.
9. Klikněte Nasadit a zkopírujte URL končící /exec.
10. Ve Vercelu přidejte:
    GOOGLE_SHEETS_WEBHOOK_URL = zkopírovaná /exec URL
    CHAT_LOG_SECRET = stejný tajný řetězec z kroku 5
11. Nastavte Production a Preview, uložte a proveďte Redeploy.

Tajný řetězec ani URL nevkládejte do GitHubu a neposílejte je ve screenshotu.
