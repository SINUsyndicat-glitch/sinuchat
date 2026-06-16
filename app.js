// ==========================================================================
// 🚀 SINU UNIVERSE ARCHITECTURE - ULTIMATE WEB3 & LIVE DATING ENGINE
// الملف: script.js | الإصدار: 7.2.0 الاحترافي الموسع الشامل
// الوصف: المحرك البرمجي المتكامل لمنصة SINU (+18) المدمج مع Firebase v8
//        ومكتبة Ethers.js لإدارة العقود الذكية، الأنظمة التفاعلية، والألعاب.
// ==========================================================================

/**
 * ==========================================================================
 * 1. الإعدادات السحابية ونواة التأسيس لـ FIREBASE (V8 COMPAT ENGINE)
 * ==========================================================================
 */

// مصفوفة مفاتيح الربط الحية لقاعدة البيانات السحابية لمشروع kriptochat-bf77a
const firebaseConfig = {
    apiKey: "AIzaSyAjANzHrD-JEEN_4DVIY705ECcJTvl4lQk",
    authDomain: "kriptochat-bf77a.firebaseapp.com",
    databaseURL: "https://kriptochat-bf77a-default-rtdb.firebaseio.com",
    projectId: "kriptochat-bf77a",
    storageBucket: "kriptochat-bf77a.firebasestorage.app",
    messagingSenderId: "438561797154",
    appId: "1:438561797154:web:26e5b2eda081e0eac2467b"
};

// فحص أمان التهيئة لبيئة عمل الاستضافة على GitHub Pages لضمان عدم تكرار النسخ
try {
    if (typeof firebase !== 'undefined') {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        console.log("🔥 [SINU ENGINE] تم تأسيس الرابط السحابي بنجاح مذهل واحترافية عاتية.");
    } else {
        console.error("❌ [CRITICAL] مكتبة Firebase غير معرفة في المتصفح. تأكد من سكريبتات الـ HTML!");
    }
} catch (initError) {
    console.error("❌ [CRITICAL ERROR] فشل حرج في تهيئة مصفوفة الخادم السحابي للمنصة:", initError);
}

// مراجع أدوات التحكم السحابية المعتمدة للعمليات اللحظية بدون غاز
const coreAuthInstance = typeof firebase !== 'undefined' ? firebase.auth() : null;
const coreDatabaseInstance = typeof firebase !== 'undefined' ? firebase.database() : null;

/**
 * ==========================================================================
 * 2. العناوين الرقمية والـ ABI الكامل لعقود الـ WEB3 (BLOCKCHAIN CORE)
 * ==========================================================================
 */

// مراجع العقود الحية على الشبكة الذكية لعملة SINU وتطبيق المحادثة
const KRIPTO_CHAT_ADDRESS = "0x690192AEeE16c40f6f7d0CA30BAA1B0884259068";
const SINU_TOKEN_ADDRESS = "0x56bB247c424958948B63de291A0C7f45d8651B76";

// المعرّف البرمجي الشامل (ABI) المعتمد لعقد KriptoChat للتفاعل والدفع والخصم السحابي
const KRIPTO_CHAT_ABI = [
    {
        "inputs": [{"internalType": "address", "name": "_sinuTokenAddress", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {"inputs": [], "name": "InsufficientChatBalance", "type": "error"},
    {"inputs": [], "name": "InsufficientWalletBalance", "type": "error"},
    {"inputs": [], "name": "NoEarnings", "type": "error"},
    {"inputs": [{"internalType": "address", "name": "owner", "type": "address"}], "name": "OwnableInvalidOwner", "type": "error"},
    {"inputs": [{"internalType": "address", "name": "account", "type": "address"}], "name": "OwnableUnauthorizedAccount", "type": "error"},
    {"inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error"},
    {"inputs": [], "name": "TransferFailed", "type": "error"},
    {"inputs": [], "name": "UnknownService", "type": "error"},
    {"inputs": [], "name": "ZeroAmount", "type": "error"},
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "EarningsWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"},
            {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false, "internalType": "uint256", "name": "newTextCost", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "newImageCost", "type": "uint256"},
            {"indexed": false, "internalType": "uint256", "name": "newVoiceCost", "type": "uint256"}
        ],
        "name": "PricesUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
            {"indexed": false, "internalType": "string", "name": "serviceType", "type": "string"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "ServiceDeducted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": true, "internalType": "address", "name": "user", "type": "address"},
            {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
        ],
        "name": "SinuDeposited",
        "type": "event"
    },
    {"inputs": [], "name": "costImage", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "costText", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "costVoice", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "_user", "type": "address"}, {"internalType": "uint256", "name": "_serviceType", "type": "uint256"}], "name": "deductForService", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [{"internalType": "uint256", "name": "_amountWithDecimals", "type":"uint256"}], "name": "depositSinu", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "_user", "type": "address"}], "name": "getInAppBalance", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "owner", "outputs": [{"internalType": "address", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [], "name": "sinuToken", "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}], "stateMutability": "view", "type": "function"},
    {"inputs": [], "name": "totalOwnerEarnings", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}], "stateMutability": "view", "type": "function"},
    {"inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [{"internalType": "uint256", "name": "_textWei", "type": "uint256"}, {"internalType": "uint256", "name": "_imageWei", "type": "uint256"}, {"internalType": "uint256", "name": "_voiceWei", "type": "uint256"}], "name": "updatePrices", "outputs": [], "stateMutability": "nonpayable", "type": "function"},
    {"inputs": [], "name": "withdrawEarnings", "outputs": [], "stateMutability": "nonpayable", "type": "function"}
];

// المعرّف البرمجي القياسي المصغر للتحكم وقراءة أرصدة الـ ERC20 لعملة SINU الأساسية
const SINU_TOKEN_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function approve(address spender, uint256 amount) returns (bool)",
    "function allowance(address owner, address spender) view returns (uint256)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function decimals() view returns (uint8)"
];

/**
 * ==========================================================================
 * 3. المغيرات العالمية وحالة النظام البنيوية (GLOBAL STATES MATRIX)
 * ==========================================================================
 */
let currentUserWallet = null;
let web3Provider = null;
let web3Signer = null;
let kriptoChatContract = null;
let sinuTokenContract = null;
let localStreamInstance = null;
let globalSystemThemeMode = "dark";
let liveViewerCountCounter = 0;
let userAppRoleType = "guest"; 
let activeDashboardTabId = "radar-pane";
let particlePoolArray = [];

// مصفوفة أسعار الهدايا المدعومة بالعملة الفاخرة داخل النظام السحابي
const globalGiftsPricingMatrix = {
    "rose": { name: "وردة جورية فاخرة", cost: 5, emoji: "🌹" },
    "coffee": { name: "قهوة ساخنة ممتازة", cost: 25, emoji: "☕" },
    "heart": { name: "نبضات قلب دافئة", cost: 100, emoji: "❤️" },
    "crown": { name: "التاج الملكي الفاخر", cost: 500, emoji: "👑" },
    "rocket": { name: "صاروخ SINU الخارق", cost: 1500, emoji: "🚀" }
};

/**
 * ==========================================================================
 * 4. نظام إدارة الأخطاء والمصفوفة التحذيرية الاحترافية (ERROR LOGGER MATRIX)
 * ==========================================================================
 */
const SinuErrorLoggerEngine = {
    logCritical: function(module, message, systemStack) {
        console.error(`🛑 [CRITICAL ERROR] [Module: ${module}] -> Message: ${message}`);
        if(systemStack) console.error(systemStack);
        this.pushErrorToFirebase(module, "CRITICAL", message);
    },
    logWarning: function(module, message) {
        console.warn(`⚠️ [WARNING] [Module: ${module}] -> Message: ${message}`);
        this.pushErrorToFirebase(module, "WARNING", message);
    },
    pushErrorToFirebase: function(module, level, text) {
        if (!coreDatabaseInstance) return;
        try {
            coreDatabaseInstance.ref('system_logs/errors').push({
                module: module,
                level: level,
                description: text,
                timestamp: Date.now(),
                userAgent: navigator.userAgent
            });
        } catch(e) {
            console.error("Failsafe triggers: Unable to dump logs to firebase cloud.", e);
        }
    }
};

/**
 * ==========================================================================
 * 5. محرك الـ WEB3 والتحكم المالي بالعقود الذكية (WEB3 ONCHAIN LOGISTICS)
 * ==========================================================================
 */

/**
 * دالة الاتصال الفاخر بالمحفظة الرقمية وفحص بروتوكولات الأمان للمتصفح
 */
async function connectPlatformWallet() {
    console.log("⏳ جاري بدء بروتوكول المصادقة الفاخر وتوصيل محفظة Web3 الحية...");
    if (typeof window.ethereum !== 'undefined') {
        try {
            web3Provider = new ethers.providers.Web3Provider(window.ethereum);
            const verifiedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            if (verifiedAccounts.length === 0) {
                SinuErrorLoggerEngine.logWarning("Web3Core", "User rejected account provision slots.");
                return null;
            }

            currentUserWallet = verifiedAccounts[0];
            web3Signer = web3Provider.getSigner();

            // بناء قنوات العقود الذكية الحية للتفاعل الفوري
            kriptoChatContract = new ethers.Contract(KRIPTO_CHAT_ADDRESS, KRIPTO_CHAT_ABI, web3Signer);
            sinuTokenContract = new ethers.Contract(SINU_TOKEN_ADDRESS, SINU_TOKEN_ABI, web3Signer);

            console.log(`🦊 [Web3 Core] تم الاتصال بنجاح. المحفظة النشطة: ${currentUserWallet}`);
            
            // تهيئة الحساب سحابياً في الفايربيز للتحقق من وجوده أو إنشاء ملف جديد
            await initializeUserSessionInCloud(currentUserWallet);
            
            // الاستماع اللحظي للرصيد السحابي المجاني عبر الفايربيز لتحديث العدادات الفاخرة
            listenToUserSinuBalance(currentUserWallet);
            
            // تحديث واجهة المستخدم لإخفاء حاويات المصادقة المصلحة القديمة
            toggleElementVisibility(".core-auth-backdrop", false);
            updateDOMWalletState(true, currentUserWallet);

            return currentUserWallet;
        } catch (authError) {
            SinuErrorLoggerEngine.logCritical("Web3Core_Auth", authError.message, authError.stack);
            alert("خطأ أثناء الاتصال بمحفظتك! يرجى التحقق من قفل محفظتك والموافقة على طلب الربط.");
            return null;
        }
    } else {
        SinuErrorLoggerEngine.logWarning("Web3Core_Env", "window.ethereum is entirely non-existent.");
        alert("لم يتم العثور على محفظة Web3 مشفرة. يرجى فتح الرابط من داخل تطبيق Trust Wallet أو MetaMask الخاص بك!");
        return null;
    }
}

/**
 * دالة تعبئة وإيداع عملة $SINU داخل العقد الذكي لشحن المحفظة السحابية للتطبيق
 * @param {number} rawCoinAmount - كمية عملات SINU المراد شحنها (بدون الأصفار العشرية)
 */
async function depositSinuToContract(rawCoinAmount) {
    if (!rawCoinAmount || isNaN(rawCoinAmount) || Number(rawCoinAmount) <= 0) {
        alert("الرجاء إدخال كمية صحيحة أكبر من الصفر لإجراء عملية الشحن الفاخرة!");
        return;
    }

    if (!kriptoChatContract || !currentUserWallet) {
        console.log("🔄 العقد غير متصل، جاري طلب استدعاء المحفظة أولاً...");
        const connected = await connectPlatformWallet();
        if (!connected) return;
    }

    try {
        const decimals = 18; 
        const parsedAmountInWei = ethers.utils.parseUnits(rawCoinAmount.toString(), decimals);
        
        showFullScreenLoadingOverlay("جاري إعداد موافقة البلوكشين (Approve)... الرجاء تأكيد المعاملة في محفظتك.");
        
        // خطوة 1: منح الصلاحية لعقد الكريبتو شات لسحب كمية العملات المطلوبة
        const approveTransactionResponse = await sinuTokenContract.approve(KRIPTO_CHAT_ADDRESS, parsedAmountInWei);
        console.log(`⏳ [Approve Tx Submitted] Hash: ${approveTransactionResponse.hash}`);
        await approveTransactionResponse.wait();
        console.log("✅ تمت الموافقة البرمجية (Approve) بنجاح على البلوكشين.");

        updateFullScreenLoadingOverlayStatus("جاري تحويل عملات $SINU إلى الخزنة السحابية... الرجاء تأكيد المعاملة الثانية والأخيرة.");

        // خطوة 2: استدعاء الدالة الحقيقية depositSinu في عقدك الذكي المطور
        const depositTransactionResponse = await kriptoChatContract.depositSinu(parsedAmountInWei);
        console.log(`⏳ [Deposit Tx Submitted] Hash: ${depositTransactionResponse.hash}`);
        await depositTransactionResponse.wait();
        console.log("🎉 تم تأكيد المعاملة وإيداع الأموال في العقد الذكي بنجاح عاتٍ!");

        // خطوة 3: زيادة الرصيد المقابل سحابياً في الفايربيز ليتمكن من استخدامه فريش وبدون غاز
        await creditUserBalanceInFirebase(currentUserWallet, rawCoinAmount);
        
        hideFullScreenLoadingOverlay();
        alert(`🎉 تهانينا الفاخرة! تم شحن حسابك بـ ${rawCoinAmount} من عملة $SINU بنجاح وتحديث الرصيد السحابي مجاناً.`);

    } catch (contractError) {
        hideFullScreenLoadingOverlay();
        SinuErrorLoggerEngine.logCritical("Blockchain_Deposit", contractError.message, contractError.stack);
        alert("فشلت عملية شحن العقد الذكي! قد يكون السبب رفض المعاملة أو عدم كفاية رصيد المحفظة الفعلي من عملة SINU أو غاز الشبكة.");
    }
}

/**
 * ==========================================================================
 * 6. محرك الـ FIREBASE السحابي وإدارة الحسابات (CLOUD DATA LOGISTICS)
 * ==========================================================================
 */

/**
 * دالة تهيئة جلسة عمل المستخدم وتأسيس شجرة البيانات في الفايربيز
 * @param {string} walletAddress - عنوان محفظة المستخدم
 */
async function initializeUserSessionInCloud(walletAddress) {
    if (!coreDatabaseInstance || !walletAddress) return;
    const userKey = walletAddress.toLowerCase();
    const userRootRef = coreDatabaseInstance.ref('users/' + userKey);

    try {
        const snapshot = await userRootRef.once('value');
        if (!snapshot.exists()) {
            console.log(`🆕 مستخدم جديد كلياً! جاري إنشاء سجل فاخر للمحفظة: ${userKey}`);
            await userRootRef.set({
                wallet: walletAddress,
                balance: 0, 
                role: "member",
                joinedTimestamp: firebase.database.ServerValue.TIMESTAMP,
                lastSeenTimestamp: firebase.database.ServerValue.TIMESTAMP,
                isBanned: false
            });
            userAppRoleType = "member";
        } else {
            const userData = snapshot.val();
            if (userData.isBanned) {
                alert("🛑 هذا الحساب محظور من دخول شبكة SINU نظراً لمخالفة شروط الكبار!");
                window.location.reload();
                return;
            }
            userAppRoleType = userData.role || "member";
            console.log(`✨ أهلاً بعودتك يا صاحب المحفظة. رتبتك الحالية: ${userAppRoleType}`);
            await userRootRef.update({
                lastSeenTimestamp: firebase.database.ServerValue.TIMESTAMP
            });
        }
    } catch (dbError) {
        SinuErrorLoggerEngine.logCritical("Firebase_InitSession", dbError.message, dbError.stack);
    }
}

/**
 * إضافة رصيد حقيقي إلى حساب المستخدم سحابياً في الفايربيز بعد الشحن أونشين
 */
async function creditUserBalanceInFirebase(walletAddress, amountToCredit) {
    if (!coreDatabaseInstance || !walletAddress) return;
    const userKey = walletAddress.toLowerCase();
    const userBalanceRef = coreDatabaseInstance.ref('users/' + userKey + '/balance');

    try {
        await userBalanceRef.transaction((currentValue) => {
            return (currentValue || 0) + Number(amountToCredit);
        });
        console.log(`💰 [Firebase Cloud] تم بنجاح شحن الحساب السحابي بـ +${amountToCredit} SINU`);
    } catch (txError) {
        SinuErrorLoggerEngine.logCritical("Firebase_CreditTransaction", txError.message, txError.stack);
    }
}

/**
 * دالة الاستماع اللحظي لرصيد الفايربيز وتحديث "العدادات الفاخرة" في واجهة الموبايل تلقائياً
 */
function listenToUserSinuBalance(walletAddress) {
    if (!coreDatabaseInstance || !walletAddress) return;
    const userKey = walletAddress.toLowerCase();

    coreDatabaseInstance.ref('users/' + userKey + '/balance').on('value', (snapshot) => {
        const currentBalance = snapshot.val() || 0;
        console.log(`🔔 [Live Balance Update] رصيدك السحابي الحالي هو: ${currentBalance} SINU`);
        
        // تحديث كافة عناصر الواجهة الحاملة لبادج العملة لمنع شكل الخانات القديم
        const balanceElements = document.querySelectorAll('.balance-pill-badge span, #user-sinu-balance-display, .premium-wallet-balance-text');
        balanceElements.forEach(element => {
            if (element) {
                element.innerText = `${Number(currentBalance).toLocaleString()} SINU`;
            }
        });
    }, (errorObject) => {
        SinuErrorLoggerEngine.logWarning("Firebase_BalanceListener", errorObject.message);
    });
}

/**
 * ==========================================================================
 * 7. نظام الهدايا التفاعلية والخصم السحابي الفوري (LIVE STREAM GIFTING ENGINE)
 * ==========================================================================
 */

/**
 * معالج الضغط على الهدايا الفاخرة للتحقق والخصم الفوري حياً بدون غاز
 * @param {string} giftKeyId - المفتاح التعريفي للهدية (rose, crown, rocket ...)
 */
function processGiftSendingIntent(giftKeyId) {
    if (!currentUserWallet) {
        alert("⚠️ الرجاء ربط محفظتك الرقمية أولاً عبر بوابة الدخول لتتمكن من إرسال الهدايا الفاخرة والتفاعل حياً!");
        return;
    }

    const giftDetails = globalGiftsPricingMatrix[giftKeyId];
    if (!giftDetails) {
        SinuErrorLoggerEngine.logWarning("GiftingEngine", `Unknown gift key processed: ${giftKeyId}`);
        return;
    }

    const userKey = currentUserWallet.toLowerCase();
    const userRootRef = coreDatabaseInstance.ref('users/' + userKey);

    userRootRef.once('value').then((snapshot) => {
        if (!snapshot.exists()) return;
        
        const userData = snapshot.val();
        const currentCloudBalance = userData.balance || 0;

        if (currentCloudBalance < giftDetails.cost) {
            alert(`⚠️ عذراً! رصيدك السحابي من عملة SINU غير كافٍ. تكلفة [${giftDetails.name}] هي ${giftDetails.cost} SINU، بينما رصيدك هو ${currentCloudBalance} SINU. الرجاء شحن حسابك بالنقر على رصيدك العلوي.`);
            return;
        }

        // إطلاق عملية الخصم الآمنة عبر المعاملات السحابية المضمونة (Firebase Transaction)
        userRootRef.child('balance').transaction((currentBal) => {
            if (currentBal >= giftDetails.cost) {
                return currentBal - giftDetails.cost;
            }
            return currentBal; // إلغاء العملية إذا تغير الرصيد فجأة
        }, (error, committed, txSnapshot) => {
            if (error) {
                SinuErrorLoggerEngine.logCritical("Gift_Transaction_Commit", error.message, error.stack);
            } else if (!committed) {
                alert("فشلت المعاملة السحابية الفورية! يرجى إعادة المحاولة.");
            } else {
                // تفعيل النجاح التام البصري والسحابي
                console.log(`✅ [Gift Deducted] تم خصم ${giftDetails.cost} SINU لـ ${giftDetails.name}`);
                
                // دفعه في شات البث التفاعلي حياً ليظهر لجميع المشاهدين
                sendLiveChatMessageEngine(currentUserWallet, `🎁 أرسل قطعة فاخرة: [${giftDetails.name} ${giftDetails.emoji}] بقيمة ${giftDetails.cost} SINU للمضيف! 🔥🎉`);
                
                // توليد الجزيئات والفيزياء البصرية المتفجرة على الشاشة
                triggerSpecialPremiumVisualEffects(giftDetails.emoji);
            }
        });

    }).catch(err => {
        SinuErrorLoggerEngine.logCritical("GiftingEngine_Fetch", err.message, err.stack);
    });
}

/**
 * ==========================================================================
 * 8. محرك رسائل شات البث المباشر الممتد (LIVE INTERACTIVE CHAT MATRIX)
 * ==========================================================================
 */

/**
 * دفع رسائل ومحتوى الشات المباشر الفاخر إلى قاعدة البيانات السحابية
 */
function sendLiveChatMessageEngine(walletAddress, rawMessageText) {
    if (!coreDatabaseInstance) return;
    if (!rawMessageText || !rawMessageText.trim()) return;

    if (rawMessageText.length > 300) {
        alert("⚠️ عذراً، لا يمكن للرسالة الفاخرة أن تتجاوز حاجز الـ 300 حرف لحماية البث من السخام!");
        return;
    }

    try {
        const chatMessagesRootRef = coreDatabaseInstance.ref('live_stream_chats');
        const newMessageNode = chatMessagesRootRef.push();
        
        newMessageNode.set({
            senderAddress: walletAddress,
            messageContent: rawMessageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            senderRole: userAppRoleType
        });
        console.log("✉️ [Chat Engine] تم إطلاق الرسالة السحابية بنجاح.");
    } catch (chatSendError) {
        SinuErrorLoggerEngine.logCritical("ChatEngine_Send", chatSendError.message, chatSendError.stack);
    }
}

/**
 * دالة بدء الاستماع الفوري لشات البث المباشر وإضافته لعلبة الرسائل الرسومية
 */
function establishLiveChatStreamListener() {
    const chatContainerViewport = document.querySelector('.private-chat-messages-scroll-box');
    if (!chatContainerViewport || !coreDatabaseInstance) return;

    console.log("📡 [Chat Engine] جاري فتح قنوات الاستماع اللحظية لرسائل البث المباشر...");
    
    // تحديد آخر 35 رسالة فقط لضمان سرعة التحميل وعدم تعليق متصفحات الموبايل القديمة
    coreDatabaseInstance.ref('live_stream_chats').limitToLast(35).on('child_added', (snapshot) => {
        const chatData = snapshot.val();
        if (!chatData) return;

        const messageBlockDiv = document.createElement('div');
        messageBlockDiv.className = "live-stream-chat-msg-row";
        messageBlockDiv.style.padding = "6px 10px";
        messageBlockDiv.style.marginBottom = "6px";
        messageBlockDiv.style.borderRadius = "10px";
        messageBlockDiv.style.background = "rgba(255, 255, 255, 0.03)";
        messageBlockDiv.style.fontSize = "0.85rem";
        messageBlockDiv.style.animation = "paneFadeEntrance 0.3s ease-out forwards";

        // تنسيق عنوان المحفظة ليكون جذاباً وقصيراً واحترافياً
        const fullAddr = chatData.senderAddress || "0xAnonymousUser";
        const shortAddr = `${fullAddr.substring(0, 6)}...${fullAddr.substring(fullAddr.length - 4)}`;
        
        // إعطاء ألوان مخصصة للمشرفين أو المضيفين لتبدو اللوحة فاخرة جداً
        let nameColor = "var(--dating-pink)";
        if (chatData.senderRole === "owner" || chatData.senderRole === "admin") {
            nameColor = "var(--dating-purple)";
            messageBlockDiv.style.borderRight = "3px solid var(--dating-purple)";
            messageBlockDiv.style.background = "rgba(174, 82, 255, 0.08)";
        }

        messageBlockDiv.innerHTML = `
            <span style="color: ${nameColor}; font-weight: bold; cursor: pointer;" onclick="openProfilePreviewModal('${fullAddr}')">
                <i class="fa-solid ${chatData.senderRole === 'owner' ? 'fa-crown' : 'fa-user-secret'} animate-pulse" style="font-size: 0.75rem; margin-left: 4px;"></i>
                ${shortAddr}:
            </span>
            <span style="color: var(--text-main); margin-right: 4px; word-break: break-word;">${escapeHtmlMarkup(chatData.messageContent)}</span>
        `;

        chatContainerViewport.appendChild(messageBlockDiv);
        
        // التمرير التلقائي الفاخر والذكي لأسفل شاشة الشات المباشر لراحة العين
        chatContainerViewport.scrollTop = chatContainerViewport.scrollHeight;
    }, (error) => {
        SinuErrorLoggerEngine.logWarning("ChatEngine_Listener", error.message);
    });
}

/**
 * ==========================================================================
 * 9. محرك تشغيل الكاميرا والبث الميكانيكي (HARDWARE WEBCAM STREAMING ENGINE)
 * ==========================================================================
 */

/**
 * دالة طلب صلاحيات وفتح كاميرا الهاتف وميكروفونه وتوجيه الدفق الفعلي للواجهة الفاخرة
 */
async function triggerBroadcasterHardwareWebcam() {
    console.log("📷 [Hardware Engine] جاري طلب صلاحية فتح الكاميرا والأجهزة الملحقة للهاتف...");
    const htmlVideoTarget = document.getElementById("hardwareLocalWebcamVideo");
    const liveFallbackOverlay = document.querySelector(".live-hardware-fallback-overlay");

    if (!htmlVideoTarget) {
        SinuErrorLoggerEngine.logWarning("HardwareCamera", "Target HTML video tag node was not located.");
        return;
    }

    // إعدادات البث المتوافقة مع أجهزة آبل والأندرويد بدقة واضحة وموفرة للبيانات للموبايل
    const streamingMediaConstraints = {
        video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: "user", // تشغيل الكاميرا الأمامية (السيلفي) تلقائياً للمضيف
            frameRate: { ideal: 24 }
        },
        audio: true
    };

    try {
        // التحقق من وجود أجهزة بث ملحقة بالمتصفح
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            localStreamInstance = await navigator.mediaDevices.getUserMedia(streamingMediaConstraints);
            
            // ضخ الدفق الرقمي الحي داخل وسم الفيديو
            htmlVideoTarget.srcObject = localStreamInstance;
            htmlVideoTarget.style.display = "block";
            
            // إخفاء صورة الفتاة الفنية والطبقة الاحتياطية لتظهر الكاميرا الحية فوراً وفخمة
            if (liveFallbackOverlay) {
                liveFallbackOverlay.style.display = "none";
            }
            
            // تفعيل عداد المشاهدين السحابي الوهمي لزيادة فخامة المظهر والتفاعل
            initializeLiveViewerCounterMock();
            console.log("✅ [Hardware Core] تم تفعيل بث الكاميرا الحية بنجاح مبهر وبدون تجميد.");
        } else {
            throw new Error("navigator.mediaDevices.getUserMedia API missing in this browser environment.");
        }
    } catch (hardwareError) {
        SinuErrorLoggerEngine.logCritical("Hardware_Webcam_Capture", hardwareError.message, hardwareError.stack);
        alert("🚨 فشل تشغيل الكاميرا الفورية للبث! يرجى التأكد من دخولك عبر رابط آمن كامل (HTTPS) ومنح المتصفح صلاحية الوصول للكاميرا والميكروفون من قفل العنوان العلوي.");
    }
}

/**
 * إيقاف دفق الكاميرا بالكامل وتحرير موارد الهاتف لتوفير بطارية المستخدم
 */
function terminateBroadcasterHardwareWebcam() {
    if (localStreamInstance) {
        try {
            localStreamInstance.getTracks().forEach(track => track.stop());
            localStreamInstance = null;
            
            const htmlVideoTarget = document.getElementById("hardwareLocalWebcamVideo");
            const liveFallbackOverlay = document.querySelector(".live-hardware-fallback-overlay");
            
            if (htmlVideoTarget) htmlVideoTarget.style.display = "none";
            if (liveFallbackOverlay) liveFallbackOverlay.style.display = "flex";
            
            console.log("🔒 [Hardware Core] تم إيقاف الكاميرا بنجاح وتحرير موارد النظام السحابي.");
        } catch(e) {
            SinuErrorLoggerEngine.logWarning("Hardware_Webcam_Termination", e.message);
        }
    }
}

/**
 * ==========================================================================
 * 10. محرك الألعاب المصغرة وتوقعات كأس العالم (SINU WORLD CUP PREDICTION MODULE)
 * ==========================================================================
 */
const SinuWorldCupPredictionModule = {
    submitPrediction: function(matchId, selectedTeam) {
        if (!currentUserWallet) {
            alert("يرجى ربط محفظتك أولاً لتتمكن من الدخول في قرعة توقعات كأس العالم 2026!");
            return;
        }
        
        if (!coreDatabaseInstance) return;
        const userKey = currentUserWallet.toLowerCase();
        
        coreDatabaseInstance.ref(`world_cup_predictions/${matchId}/${userKey}`).set({
            predictedWinner: selectedTeam,
            timestamp: Date.now(),
            hasPaidFee: true
        }).then(() => {
            alert(`⚽ تم تسجيل توقعك بنجاح لفوز [${selectedTeam}]! سيتم مراجعة النتائج وتوزيع بركة الجوائز تلقائياً عبر العقد الذكي.`);
            sendLiveChatMessageEngine(currentUserWallet, `⚽ دخل في مصفوفة توقعات مباراة كأس العالم وتوقع فوز [${selectedTeam}]! 🔥`);
        }).catch(err => {
            SinuErrorLoggerEngine.logCritical("WorldCupPrediction", err.message, err.stack);
        });
    },
    renderMatchesDashboard: function() {
        const predictionBox = document.getElementById("sinu-worldcup-matches-box");
        if (!predictionBox) return;
        
        // بناء الهيكل البصري الاحترافي الفاخر للمباريات المدمجة
        predictionBox.innerHTML = `
            <div class="web3-onchain-card-panel animate-pulse" style="margin-top: 15px; border-color: var(--dating-purple);">
                <h4 style="color:#fff; margin-bottom:12px;"><i class="fa-solid fa-trophy text-amber-400"></i> توقعات كأس العالم 2026 الحية ($SINU Pools)</h4>
                <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(0,0,0,0.3); padding:10px; border-radius:12px;">
                    <span style="font-weight:bold; color:var(--text-main);">البرازيل 🇧🇷</span>
                    <span style="color:var(--dating-pink); font-weight:900;">ضد</span>
                    <span style="font-weight:bold; color:var(--text-main);">الأرجنتين 🇦🇷</span>
                </div>
                <div style="display:flex; gap:10px; margin-top:10px;">
                    <button class="web3-btn-trigger" style="flex:1; background:var(--premium-gradient);" onclick="SinuWorldCupPredictionModule.submitPrediction('M1', 'Brazil')">توقع البرازيل</button>
                    <button class="web3-btn-trigger" style="flex:1; background:linear-gradient(135deg, var(--dating-purple) 0%, #7624d9 100%);" onclick="SinuWorldCupPredictionModule.submitPrediction('M1', 'Argentina')">توقع الأرجنتين</button>
                </div>
            </div>
        `;
    }
};

/**
 * ==========================================================================
 * 11. محرك المؤثرات البصرية والفيزياء الفاخرة (PREMIUM PARTICLES PHYSICS ENGINE)
 * ==========================================================================
 */

/**
 * توليد تأثيرات بصرية متفجرة وجميلة وطائرة للأيقونات والرموز التعبيرية عند إرسال الهدايا لضمان فخامة الموقع
 * @param {string} emoji - الرمز التعبيري المراد تطييره وتفجيره على الشاشة
 */
function triggerSpecialPremiumVisualEffects(emoji) {
    const totalParticlesCount = emoji === "🚀" ? 15 : 6;
    const bodyViewportContainer = document.body;

    for (let index = 0; index < totalParticlesCount; index++) {
        const visualParticleNode = document.createElement('div');
        visualParticleNode.className = 'floating-overlay-emoji';
        visualParticleNode.innerText = emoji;
        
        // إعطاء جزيئات المتفجرات مواقع عشوائية في أسفل شاشة الهاتف
        const randomHorizontalLeftOffset = Math.random() * 80 + 10; 
        const randomScaleFactor = Math.random() * 0.6 + 0.6;
        const randomAnimationDuration = Math.random() * 1.5 + 2.0;

        visualParticleNode.style.left = `${randomHorizontalLeftOffset}%`;
        visualParticleNode.style.fontSize = `${randomScaleFactor * 3}rem`;
        visualParticleNode.style.bottom = "-60px";
        visualParticleNode.style.animation = `premiumFloatUpEffect ${randomAnimationDuration}s cubic-bezier(0.1, 0.8, 0.3, 1) forwards`;
        
        // إذا كان المقذوف هو صاروخ SINU الفاخر، نضيف تأثيراً متوهجاً خلفياً مرعباً
        if (emoji === "🚀") {
            visualParticleNode.style.filter = "drop-shadow(0 0 20px #ff6584) drop-shadow(0 0 40px #ae52ff)";
        }

        bodyViewportContainer.appendChild(visualParticleNode);

        // تنظيف وحذف العنصر البرمجي من الذاكرة فور انتهاء الأنيميشن لعدم بطء المتصفح
        setTimeout(() => {
            visualParticleNode.remove();
        }, randomAnimationDuration * 1000);
    }
}

/**
 * ==========================================================================
 * 12. محرك التحكم بواجهة المستخدم والتناقل السفلي (DOM NAVIGATION & UI MANAGER)
 * ==========================================================================
 */

/**
 * تهيئة وإدارة التبديل الحركي الفاخر بين نوافذ شاشة الموبايل المتجاوبة خمسة زون
 */
function initializeNavigationViewportTabsEngine() {
    const bottomNavActionItems = document.querySelectorAll(".app-bottom-navigation-bar .nav-item");
    const structuralAppPanes = document.querySelectorAll(".app-viewports-scroller .app-pane");

    if (bottomNavActionItems.length === 0) {
        SinuErrorLoggerEngine.logWarning("UIManager_Nav", "No target navigation action items discovered in DOM layout.");
        return;
    }

    bottomNavActionItems.forEach(navigationButtonNode => {
        navigationButtonNode.addEventListener("click", () => {
            const targetedPaneAttributeId = navigationButtonNode.getAttribute("data-target-pane");
            if (!targetedPaneAttributeId) return;

            console.log(`🧭 [UI Navigation] جاري الانتقال الفاخر إلى واجهة اللوحة: ${targetedPaneAttributeId}`);
            activeDashboardTabId = targetedPaneAttributeId;

            // 1. إزالة كلاس النشاط والتوثيق من جميع أزرار الهيدر والفوتر السفلي
            bottomNavActionItems.forEach(button => button.classList.remove("active"));
            
            // 2. إخفاء كل لوحات الشاشات الخمس برفق حركي
            structuralAppPanes.forEach(pane => {
                pane.style.display = "none";
                pane.style.opacity = "0";
            });

            // 3. تفعيل وإضاءة الزر الذي تم النقر عليه بنظام النيون الفاخر
            navigationButtonNode.classList.add("active");
            
            // 4. إظهار الشاشة المستهدفة فوراً وتنشيط دوالها الخاصة
            const targetPaneDOMNode = document.getElementById(targetedPaneAttributeId);
            if (targetPaneDOMNode) {
                targetPaneDOMNode.style.display = "block";
                // أنيميشن ناعم لتأكيد الدخول
                setTimeout(() => {
                    targetPaneDOMNode.style.opacity = "1";
                }, 40);

                // ميكانيكية خاصة: إذا دخل المستخدم لوحة البث المباشر، نفتح الشات فورا، وإذا خرج نغلق الكاميرا تلقائياً
                if (targetedPaneAttributeId === "live-pane") {
                    console.log("🍿 دخل شاشة البث المباشر الفاخر.");
                } else {
                    // تفكيك الكاميرا إذا خرج لإنقاذ موارد هاتف المستخدم
                    terminateBroadcasterHardwareWebcam();
                }
                
                // تشغيل شاشة كأس العالم المدمجة إذا دخل لوحة الألعاب
                if (targetedPaneAttributeId === "games-pane" || targetedPaneAttributeId === "predictions-pane") {
                    SinuWorldCupPredictionModule.renderMatchesDashboard();
                }
            }
        });
    });
}

/**
 * ==========================================================================
 * 13. الدالات المساعدة وحقن النوافذ المنبثقة (COMPREHENSIVE UTILITIES HELPER)
 * ==========================================================================
 */

function toggleElementVisibility(cssSelector, shouldShow) {
    const domNode = document.querySelector(cssSelector);
    if (domNode) {
        domNode.style.display = shouldShow ? "flex" : "none";
    }
}

function updateDOMWalletState(isConnected, walletHexAddress) {
    const labelTextNode = document.getElementById("wallet-connection-status-label");
    if (labelTextNode) {
        if (isConnected && walletHexAddress) {
            labelTextNode.innerText = `متصل: ${walletHexAddress.substring(0,6)}...${walletHexAddress.substring(walletHexAddress.length-4)}`;
        } else {
            labelTextNode.innerText = "غير متصل - اربط المحفظة";
        }
    }
}

function showFullScreenLoadingOverlay(loadingMessageText) {
    let overlayNode = document.getElementById("sinu-premium-loading-overlay");
    if (!overlayNode) {
        overlayNode = document.createElement('div');
        overlayNode.id = "sinu-premium-loading-overlay";
        overlayNode.style.position = "fixed";
        overlayNode.style.inset = "0";
        overlayNode.style.background = "rgba(5, 2, 4, 0.95)";
        overlayNode.style.backdropFilter = "blur(15px)";
        overlayNode.style.zIndex = "999999";
        overlayNode.style.display = "flex";
        overlayNode.style.flexDirection = "column";
        overlayNode.style.alignItems = "center";
        overlayNode.style.justifyContent = "center";
        overlayNode.style.color = "#fff";
        overlayNode.style.fontFamily = "Cairo, sans-serif";
        overlayNode.innerHTML = `
            <div class="radar-core-scanner" style="width:70px; height:70px; margin-bottom:15px;">
                <i class="fa-solid fa-circle-notch fa-spin" style="font-size:2rem; color:#fff;"></i>
            </div>
            <p id="sinu-loading-overlay-text-node" style="font-weight:bold; font-size:1rem; text-align:center; padding:0 20px;">${loadingMessageText}</p>
        `;
        document.body.appendChild(overlayNode);
    } else {
        updateFullScreenLoadingOverlayStatus(loadingMessageText);
        overlayNode.style.display = "flex";
    }
}

function updateFullScreenLoadingOverlayStatus(updatedText) {
    const textNode = document.getElementById("sinu-loading-overlay-text-node");
    if (textNode) textNode.innerText = updatedText;
}

function hideFullScreenLoadingOverlay() {
    const overlayNode = document.getElementById("sinu-premium-loading-overlay");
    if (overlayNode) overlayNode.style.display = "none";
}

function escapeHtmlMarkup(unsafeRawTextString) {
    return unsafeRawTextString
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function openProfilePreviewModal(walletAddressAccount) {
    const modalBackdropSurface = document.querySelector(".profile-preview-modal-backdrop");
    if (!modalBackdropSurface || !coreDatabaseInstance) return;

    const short = `${walletAddressAccount.substring(0, 8)}...${walletAddressAccount.substring(walletAddressAccount.length - 6)}`;
    
    // سحب رتبة المحفظة المنقرع عليها حياً لتفخيم كرت العرض
    coreDatabaseInstance.ref('users/' + walletAddressAccount.toLowerCase()).once('value').then((snapshot) => {
        let currentBalanceText = "0 SINU";
        let userRoleLabel = "عضو شبكة متألق";
        
        if (snapshot.exists()) {
            const data = snapshot.val();
            currentBalanceText = `${(data.balance || 0).toLocaleString()} SINU`;
            if (data.role === "owner") userRoleLabel = "👑 مؤسس شبكة SINU ومطور العقد";
            if (data.role === "admin") userRoleLabel = "🛡️ مشرف المنصة العام";
        }

        modalBackdropSurface.innerHTML = `
            <div class="modal-surface-card" style="border-color: var(--border-color); relative">
                <div class="radar-core-scanner" style="width:60px; height:60px; margin:0 auto 15px auto; background:var(--premium-gradient)">
                    <i class="fa-solid fa-user-secret" style="font-size:1.4rem; color:#fff;"></i>
                </div>
                <h3 style="color:#fff; margin-bottom:4px; font-size:1.1rem; word-break:break-all;">${short}</h3>
                <p style="color:var(--dating-pink); font-size:0.8rem; font-weight:bold; margin-bottom:15px;">${userRoleLabel}</p>
                
                <div style="background:rgba(0,0,0,0.4); padding:12px; border-radius:16px; margin-bottom:20px; border:1px solid rgba(255,101,132,0.1)">
                    <span style="font-size:0.78rem; color:var(--text-muted); display:block; margin-bottom:4px;">الرصيد السحابي المعتمد</span>
                    <strong style="font-size:1.2rem; color:var(--gold); font-weight:900;">${currentBalanceText}</strong>
                </div>

                <button class="auth-action-trigger-button" style="padding:10px; font-size:0.85rem; background:rgba(255,255,255,0.05); border:1px solid var(--border-color); color:#fff; box-shadow:none;" onclick="closeProfilePreviewModal()">إغلاق الكرت الفاخر</button>
            </div>
        `;
        modalBackdropSurface.style.display = "flex";
    });
}

function closeProfilePreviewModal() {
    const modalBackdropSurface = document.querySelector(".profile-preview-modal-backdrop");
    if (modalBackdropSurface) modalBackdropSurface.style.display = "none";
}

function initializeLiveViewerCounterMock() {
    const countLabelElement = document.querySelector(".live-status-pill-indicator");
    if (!countLabelElement) return;

    liveViewerCountCounter = Math.floor(Math.random() * 45) + 120; // توليد أرقام تفاعلية فورية
    countLabelElement.innerText = `🔴 مـباشـر | ${liveViewerCountCounter} مـشـاهـد`;

    setInterval(() => {
        if (localStreamInstance) {
            const variance = Math.floor(Math.random() * 5) - 2;
            liveViewerCountCounter += variance;
            countLabelElement.innerText = `🔴 مـباشـر | ${liveViewerCountCounter} مـشـاهـد`;
        }
    }, 4000);
}

/**
 * ==========================================================================
 * 14. التأسيس الشامل وبدء التوصيل فور جهوزية الواجهة (FINAL CONSTRUCT INITIALIZER)
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 [SINU MATRIX ENGINE] تم استدعاء وتحميل عتاد المحرك الفاخر بنجاح موسع ومستعد للتنفيذ الحقيقي.");

    // 1. تشغيل قنوات شات البث اللحظي الفاخر
    establishLiveChatStreamListener();

    // 2. تشغيل التناقل السفلي الاحترافي للشاشات الخمس
    initializeNavigationViewportTabsEngine();

    // 3. ربط أزرار بوابة الدخول لإخفاء الخانات البدائية وربط المحفظة فوراً
    const gateLoginTriggerButton = document.querySelector(".auth-action-trigger-button");
    if (gateLoginTriggerButton) {
        gateLoginTriggerButton.addEventListener("click", () => {
            connectPlatformWallet();
        });
    }

    // 4. ربط الضغط على المحفظة العلوية لفتح صندوق الشحن والإيداع أونشين عبر العقد
    const premiumHeaderWalletBadge = document.querySelector(".balance-pill-badge");
    if (premiumHeaderWalletBadge) {
        premiumHeaderWalletBadge.addEventListener("click", () => {
            const rawInputCoins = prompt("💰 مرحباً بك في بوابة الـ Web3 لشحن رصيد $SINU السحابي مجاناً!\n\nأدخل كمية عملات SINU التي ترغب بسحبها من محفظتك وإيداعها في العقد لتغذية حسابك السحابي:");
            if (rawInputCoins) {
                const cleanAmount = parseFloat(rawInputCoins);
                depositSinuToContract(cleanAmount);
            }
        });
    }

    // 5. ربط النقر على دائرة الرادار المركزي لبدء الكاميرا والميكروفون حياً فوراً
    const centralRadarCoreScanner = document.querySelector(".radar-core-scanner");
    if (centralRadarCoreScanner) {
        centralRadarCoreScanner.addEventListener("click", () => {
            alert("⏳ جاري فحص الأجهزة واستدعاء عتاد الكاميرا لبدء بثك المباشر الفخم... الرجاء الموافقة على صلاحيات متصفحك.");
            triggerBroadcasterHardwareWebcam();
        });
    }

    // 6. ربط حقول إرسال رسائل الشات التفاعلي العادي لتسجيلها سحابياً
    const structuralChatInputField = document.querySelector(".private-chat-input-row input");
    const structuralChatSendButton = document.querySelector(".private-chat-input-row button");
    
    if (structuralChatSendButton && structuralChatInputField) {
        const executeMessageDispatch = () => {
            if (!currentUserWallet) {
                alert("⚠️ الرجاء ربط محفظتك الرقمية عبر بوابة الدخول أولاً لتتمكن من الكتابة في الشات!");
                return;
            }
            sendLiveChatMessageEngine(currentUserWallet, structuralChatInputField.value);
            structuralChatInputField.value = ""; // تفريغ الخانة فوراً
        };

        structuralChatSendButton.addEventListener("click", executeMessageDispatch);
        
        // دعم الإرسال الفاخر عند الضغط على زر Enter في كيبورد الموبايل
        structuralChatInputField.addEventListener("keydown", (keyEvent) => {
            if (keyEvent.key === "Enter") {
                executeMessageDispatch();
            }
        });
    }

    // 7. ربط مصفوفة زري النيون في متجر الهدايا الفاخر بناءً على خواص الـ HTML المضافة من قبلك
    document.body.addEventListener("click", (clickEvent) => {
        const targetedGiftItemNode = clickEvent.target.closest("[data-gift-cost]");
        if (targetedGiftItemNode) {
            const parsedCost = parseInt(targetedGiftItemNode.getAttribute("data-gift-cost")) || 5;
            const fallbackKeyId = targetedGiftItemNode.getAttribute("data-gift-id") || "rose";
            processGiftSendingIntent(fallbackKeyId);
        }
    });

    /**
 * الدوال المفقودة التي يطلبها الـ DOM (أزرار الواجهة)
 */
function toggleAuthPanelMode(show) {
    console.log("🛠️ [UI] جاري تبديل حالة لوحة المصادقة...");
    const authBackdrop = document.querySelector(".core-auth-backdrop");
    if (authBackdrop) {
        authBackdrop.style.display = show ? "flex" : "none";
    }
}

function executeCoreAuthenticationAction(actionType) {
    console.log("🔑 [Auth] جاري تنفيذ إجراء المصادقة:", actionType);
    if (actionType === "login") {
        connectPlatformWallet();
    } else if (actionType === "signup") {
        // يمكنك توجيهها لنفس دالة ربط المحفظة لأنها هي الأساس في مشروعك
        connectPlatformWallet();
    }
}

});

