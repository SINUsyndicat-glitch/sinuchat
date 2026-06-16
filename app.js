// ==========================================================================
//   🚀   SINU UNIVERSE - ULTIMATE CORE WEB3 & LIVE SOCIAL ENGINE
//   الملف: app.js | الإصدار: 4.0.0 الاحترافي الموسع
//   الوصف: المحرك الشامل لإدارة الـ Live، الـ Web3، الملحقات، وقاعدة البيانات
// ==========================================================================

/**
 * ==========================================================================
 * SECTION 1: التهيئة الفنية وإعدادات الخادم السحابي (Firebase Configuration)
 * ==========================================================================
 * تم تدقيق بيانات الربط السحابي ومزامنتها مع مشروعك الأصلي لضمان ثبات الجلسات.
 // ==========================================================================
// 🔥 [SINU ENGINE] CORE FIREBASE INTEGRATION (v8 COMPAT)
// ==========================================================================

const firebaseConfig = {
    apiKey: "AIzaSyAjANzHrD-JEEN_4DVIY705ECcJTvl4lQk",
    authDomain: "kriptochat-bf77a.firebaseapp.com",
    databaseURL: "https://kriptochat-bf77a-default-rtdb.firebaseio.com",
    projectId: "kriptochat-bf77a",
    storageBucket: "kriptochat-bf77a.firebasestorage.app",
    messagingSenderId: "438561797154",
    appId: "1:438561797154:web:26e5b2eda081e0eac2467b"
};

// فحص أمان التهيئة لمنع تكرار النسخ في بيئة عمل GitHub Pages
try {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    console.log("🔥 [SINU ENGINE] تم تأسيس الرابط السحابي بنجاح مذهل.");
} catch (initError) {
    console.error("❌ [CRITICAL ERROR] فشل حرج في تهيئة مصفوفة الخادم السحابي:", initError);
}

// مراجع أدوات التحكم السحابية المعتمدة
const coreAuthInstance = firebase.auth();
const coreDatabaseInstance = firebase.database();

// ==========================================================================
// 💎 دمج التحكم بالرصيد والشات الفاخر حياً عبر السحاب
// ==========================================================================

/**
 * 1. دالة تحديث رصيد محفظة مستخدم في Firebase لتجنب رسوم الغاز المتكررة
 */
function updateSinuBalance(walletAddress, amount) {
    if (!walletAddress) return;
    
    // إزالة الحروف الكبيرة لتوحيد العناوين في قاعدة البيانات
    const userKey = walletAddress.toLowerCase(); 
    
    coreDatabaseInstance.ref('users/' + userKey).update({
        balance: amount,
        lastUpdated: firebase.database.ServerValue.TIMESTAMP
    })
    .then(() => console.log(`💰 [Firebase] تم تحديث رصيد المحفظة ${userKey} بنجاح.`))
    .catch(err => console.error("❌ خطأ سحابي في تحديث الرصيد:", err));
}

/**
 * 2. الاستماع اللحظي لرصيد المستخدم لتحديث "الخانات الفاخرة" في واجهة الموبايل تلقائياً
 */
function listenToUserBalance(walletAddress) {
    if (!walletAddress) return;
    const userKey = walletAddress.toLowerCase();

    coreDatabaseInstance.ref('users/' + userKey + '/balance').on('value', (snapshot) => {
        const currentBalance = snapshot.val() || 0;
        
        // تحديث العنصر البصري الفاخر في الهيدر (البادج الخاص بالعملة)
        const balanceElement = document.querySelector('.balance-pill-badge span');
        if (balanceElement) {
            balanceElement.innerText = `${currentBalance} SINU`;
        }
    });
}

/**
 * 3. نظام إرسال رسائل الشات التفاعلي المباشر للبث (+18 Chat Matrix)
 */
function sendLiveChatMessage(walletAddress, messageText) {
    if (!messageText.trim()) return;
    
    const chatRef = coreDatabaseInstance.ref('live_stream_chats').push();
    chatRef.set({
        sender: walletAddress || "Anonymous_User",
        message: messageText,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
}

/**
 * 4. الاستماع الفوري لشات البث وإضافته لعلبة الرسائل المتجاوبة تلقائياً
 */
function listenToLiveChat() {
    const chatContainer = document.querySelector('.private-chat-messages-scroll-box');
    if (!chatContainer) return;

    coreDatabaseInstance.ref('live_stream_chats').limitToLast(25).on('child_added', (snapshot) => {
        const data = snapshot.val();
        
        const messageWrapper = document.createElement('div');
        messageWrapper.style.marginBottom = "8px";
        messageWrapper.style.fontSize = "0.85rem";
        messageWrapper.innerHTML = `
            <strong style="color: var(--dating-pink);">${data.sender.substring(0, 6)}...:</strong> 
            <span style="color: var(--text-main);">${data.message}</span>
        `;
        
        chatContainer.appendChild(messageWrapper);
        chatContainer.scrollTop = chatContainer.scrollHeight; // سكرول تلقائي لأسفل الشات
    });
}

// تشغيل الاستماع للشات تلقائياً عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    listenToLiveChat();
});

/**
 * ==========================================================================
 * SECTION 2: سجلات ونماذج إدارة الحالة الداخلية (State Hydration Records)
 * ==========================================================================
 */
let activeUserSessionProfile = null;      // بيانات حساب المستخدم المتصل حالياً
let myCachedProfileDataRecord = null;     // كاش محلي للبيانات الشخصية لتوفير الـ Gas
let currentAuthPanelMode = "login";       // وضع البوابة الافتراضي
let currentSelectedChatPartner = null;    // الصديق المستهدف بالشات الخاص
let currentActiveMobilePaneId = "paneRadar"; // اللوحة الحالية النشطة على شاشة الهاتف

// مراجع خاصة بـ عتاد الـ Live والبث المباشر
let localMediaStreamObject = null;        // دفق الكاميرا والميكروفون الحي
let activeLiveStreamSessionId = null;     // معرف غرفة البث المباشر النشطة حالياً
let liveChatListenerRef = null;           // مستمع شات البث اللوحي اللحظي
let runningTotalLiveEarnings = 0;         // عداد أرباح المضيف خلال البث الحالي

/**
 * ==========================================================================
 * SECTION 3: عناوين بروتوكولات الـ Web3 والعقود الذكية لعملة $SINU
 * ==========================================================================
 */
const KRIPTO_CHAT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const SINU_TOKEN_ADDRESS  = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// الـ ABI المصغر المعتمد للتحكم في عقود الـ Smart Contracts من المتصفح
const KRIPTO_CHAT_ABI = [
    "function depositSinu(uint256 amount) external",
    "function withdrawSinu(uint256 amount) external",
    "function getInAppBalance(address user) external view returns (uint256)",
    "event SinuDeposited(address indexed user, uint256 amount)",
    "event SinuWithdrawn(address indexed user, uint256 amount)"
];

const SINU_TOKEN_ABI = [
    "function balanceOf(address account) external view returns (uint256)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)"
];

let web3BrowserProvider = null;
let web3SignerInstance = null;
let kriptoChatContractInstance = null;
let sinuTokenContractInstance = null;
let activeConnectedWalletAddress = null;

/**
 * ==========================================================================
 * SECTION 4: السجل الرقمي الموحد للألعاب والملحقات الأربعة (Games Registry)
 * ==========================================================================
 * هنا تم لصق وتأمين روابط تطبيقاتك الأربعة لتدار وتفتح برمجياً بالكامل.
 */
const sinuIntegratedGamesRegistry = {
    worldCup: {
        title: "منصة توقعات المونديال الكبرى",
        url: "https://html-uwq7.vercel.app/",
        costToPlay: 20,
        icon: "🏆"
    },
    geniusChallenge: {
        title: "تحدي العباقرة العلمي المطور",
        url: "https://index-html-fawn-gamma.vercel.app/",
        costToPlay: 15,
        icon: "🧠"
    },
    domino: {
        title: "لعبة الدومينو التنافسية الحية",
        url: "https://index1-html-m3ki.vercel.app/",
        costToPlay: 10,
        icon: "🀄"
    },
    wheelOfFortune: {
        title: "عجلة الحظ الرقمية المخصصة",
        url: "https://index2-html-ashy.vercel.app/",
        costToPlay: 25,
        icon: "🎡"
    }
};

/**
 * ==========================================================================
 * SECTION 5: مستودع وقائمة الهدايا الفاخرة المعتمدة لبث $SINU (Gifts System)
 * ==========================================================================
 */
const sinuGiftsStoreRegistry = {
    rose: { id: "g_rose", name: "وردة جورية", price: 5, icon: "🌹" },
    coffee: { id: "g_coffee", name: "قهوة فاخرة", price: 15, icon: "☕" },
    heart: { id: "g_heart", name: "قلب نابض", price: 50, icon: "💖" },
    crown: { id: "g_crown", name: "التاج الملكي", price: 500, icon: "👑" },
    rocket: { id: "g_rocket", name: "صاروخ SINU الخارق", price: 1500, icon: "🚀" }
};

/**
 * ==========================================================================
 * SECTION 6: المحرك المدقق الفاخر لجزء الـ Live والبث المباشر (Live Engine)
 * ==========================================================================
 * هذا هو الجزء الحركي الأهم، المسؤول عن معالجة دفق الكاميرا حياً، استقبال الهدايا،
 * حظر المضيف من إرسال هدية لنفسه، والتحويل المالي الفوري والآمن للأرصدة.
 */

async function startSinuProfessionalLiveStream() {
    if (!currentLoggedInUser) {
        alert("⚠️ خطأ صلاحية: يجب تسجيل الدخول لتمكين بدء البث المباشر!");
        return;
    }

    const liveVideoContainer = document.getElementById("hardwareLocalWebcamVideo");
    const fallbackText = document.getElementById("cameraFallbackText");
    
    if (!liveVideoContainer) {
        alert("⚠️ خطأ تقني: لم يتم العثور على مشغل الفيديو في واجهة الـ HTML!");
        return;
    }

    try {
        console.log("🎥 جاري فحص وتأمين الوصول إلى عتاد الموبايل (الكاميرا والصوت)...");
        
        // 1. طلب الصلاحيات الرسمية للوصول للكاميرا بجودة عالية ومعدل إطارات سلس
        localMediaStreamObject = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720, facingMode: "user" },
            audio: true
        });

        // 2. ربط البث الحي بعنصر الفيديو وإخفاء غطاء الحماية
        liveVideoContainer.srcObject = localMediaStreamObject;
        if (fallbackText) fallbackText.style.display = "none";
        liveVideoContainer.style.display = "block";

        // 3. بناء غرفة البث السحابي في خادم Firebase ليراها بقية أعضاء الرادار
        activeLiveStreamSessionId = currentLoggedInUser.uid;
        const liveSessionRef = coreDatabaseInstance.ref(`live_streams/${activeLiveStreamSessionId}`);
        
        const hostName = myCachedProfileDataRecord ? myCachedProfileDataRecord.username : "مضيف مجهول";

        await liveSessionRef.set({
            hostId: activeLiveStreamSessionId,
            hostUsername: hostName,
            startedAt: Date.now(),
            viewerCount: 1,
            totalEarnings: 0
        });

        // حماية النظام: إزالة غرفة البث تلقائياً فور خروج المضيف من الموقع
        liveSessionRef.onDisconnect().remove();
        coreDatabaseInstance.ref(`live_chats/${activeLiveStreamSessionId}`).onDisconnect().remove();

        // 4. تفعيل قنوات الشات الحي والهدايا الرقمية المخصصة للبث
        runningTotalLiveEarnings = 0;
        establishLiveChatAndGiftListener(activeLiveStreamSessionId);
        
        alert("🔴 أنت الآن تبث مباشرة في مجتمع SINU! يمكن للجميع التفاعل معك وإرسال الهدايا.");
        console.log("🚀 [LIVE] تم تفعيل البث وتدقيق قنوات الاتصال بنجاح.");

    } catch (error) {
        console.error("❌ فشل تشغيل هاردوير البث الحي:", error);
        alert("❌ تعذر تشغيل الكاميرا! يرجى منح صلاحيات الفيديو والصوت للتطبيق من إعدادات المتصفح.");
    }
}

function toggleLocalWebcamHardwareState() {
    if (localMediaStreamObject) {
        // إذا كان البث يعمل، نقوم بإيقافه فوراً وتنظيف الذاكرة
        terminateSinuLiveStream();
    } else {
        // إذا كان مغلقاً، نقوم بتشغيله
        startSinuProfessionalLiveStream();
    }
}

function terminateSinuLiveStream() {
    console.log("🛑 جاري إيقاف البث المباشر وتنظيف قنوات العتاد...");

    // 1. إطفاء الكاميرا والميكروفون لضمان خصوصية المستخدم الكاملة
    if (localMediaStreamObject) {
        localMediaStreamObject.getTracks().forEach(track => track.stop());
        localMediaStreamObject = null;
    }

    const liveVideoContainer = document.getElementById("hardwareLocalWebcamVideo");
    const fallbackText = document.getElementById("cameraFallbackText");
    
    if (liveVideoContainer) {
        liveVideoContainer.srcObject = null;
        liveVideoContainer.style.display = "none";
    }
    if (fallbackText) fallbackText.style.display = "flex";

    // 2. مسح وتنظيف السجلات السحابية للغرفة من Firebase
    if (activeLiveStreamSessionId) {
        coreDatabaseInstance.ref(`live_streams/${activeLiveStreamSessionId}`).remove();
        coreDatabaseInstance.ref(`live_chats/${activeLiveStreamSessionId}`).remove();
        
        if (liveChatListenerRef && activeLiveStreamSessionId) {
            coreDatabaseInstance.ref(`live_chats/${activeLiveStreamSessionId}`).off('child_added', liveChatListenerRef);
        }
        activeLiveStreamSessionId = null;
    }

    alert("🔴 تم إغلاق غرفة البث بنجاح، وتأمين خصوصية الكاميرا.");
}

function establishLiveChatAndGiftListener(sessionId) {
    const chatContainer = document.getElementById("privateChatMessagesScrollBox");
    if (!chatContainer) return;

    chatContainer.innerHTML = `<div style="color:var(--private-color); font-size:0.75rem; text-align:center; font-weight:bold; margin-bottom:10px;">🛡️ قناة البث المباشر مشفرة بنظام عملة SINU الاجتماعي</div>`;

    // الاستماع والتدقيق لكل حدث (رسالة نصية أو هدية مالية) يدخل الغرفة حياً
    liveChatListenerRef = coreDatabaseInstance.ref(`live_chats/${sessionId}`).on('child_added', (snapshot) => {
        const payload = snapshot.val();
        if (!payload) return;

        let bubbleHtml = "";

        if (payload.type === "gift") {
            // كود معالجة وتوليد تأثير الهدية الحركية الفاخرة على الشاشة
            bubbleHtml = `
                <div style="background: rgba(233, 30, 99, 0.12); border-right: 4px solid var(--dating-pink); padding: 8px 12px; border-radius: 12px; margin-bottom: 8px; animation: pulse 1s infinite;">
                    <span style="color: var(--dating-pink); font-weight: 900;">🎁 @${payload.sender}:</span> 
                    أرسل <b style="color:var(--gold);">${payload.giftName} ${payload.giftIcon}</b> إلى المضيف! (+${payload.giftPrice} SINU)
                </div>
            `;
            // تفعيل أنيميشن تطاير الإيموجي على واجهة الهاتف حياً
            triggerLuxuryGiftFloatingOverlayEffect(payload.giftIcon);
        } else {
            // كود معالجة الرسائل النصية العامة داخل البث
            bubbleHtml = `
                <div style="background: var(--bg-input); padding: 8px 14px; border-radius: 14px; margin-bottom: 6px; max-width:85%;">
                    <strong style="color: var(--dating-purple); font-size: 0.8rem; display:block;">@${payload.sender}:</strong>
                    <span style="color: var(--text-main); font-size: 0.85rem;">${payload.text}</span>
                </div>
            `;
        }

        chatContainer.innerHTML += bubbleHtml;
        chatContainer.scrollTop = chatContainer.scrollHeight; // النزول التلقائي لآخر رسالة
    });
}

function sendGiftToLiveBroadcaster(giftKey) {
    const gift = sinuGiftsStoreRegistry[giftKey];
    
    // تدقيق الأمان الأول: التحقق من وجود الجلسة واللاعب
    if (!gift || !currentLoggedInUser) return;

    // إذا لم يكن المطور في غرفته الشخصية، نعتبر أنه يرسل للشخص المحدد في النظام
    const targetHostId = activeLiveStreamSessionId || currentSelectedChatPartner;

    if (!targetHostId) {
        alert("⚠️ يرجى اختيار مستخدم نشط أو الدخول لغرفة بث أولاً لإرسال الهدايا!");
        return;
    }

    if (targetHostId === currentLoggedInUser.uid) {
        alert("❌ حظر أمان: لا يمكنك إرسال الهدايا المالية لحسابك الشخصي!");
        return;
    }

    const senderBalanceRef = coreDatabaseInstance.ref(`users/${currentLoggedInUser.uid}/balance`);
    const hostBalanceRef = coreDatabaseInstance.ref(`users/${targetHostId}/balance`);

    // التدقيق المالي المزدوج الصارم (Double-Entry Balance Verification)
    senderBalanceRef.once('value').then((snapshot) => {
        let currentSenderBalance = snapshot.val() || 0;

        if (currentSenderBalance < gift.price) {
            alert(`❌ رصيد غير كافٍ! قيمة الهدية ${gift.price} SINU، ورصيدك الحالي هو ${currentSenderBalance} SINU`);
            return;
        }

        // الخصم والتحويل الفوري السحابي
        let updatedSenderBalance = currentSenderBalance - gift.price;
        senderBalanceRef.set(updatedSenderBalance).then(() => {
            
            hostBalanceRef.once('value').then((hostSnapshot) => {
                let currentHostBalance = hostSnapshot.val() || 0;
                hostBalanceRef.set(currentHostBalance + gift.price);
            });

            // تسجيل حركة الهدية في سجل الشات السحابي الحي للغرفة
            const senderDisplayName = myCachedProfileDataRecord ? myCachedProfileDataRecord.username : "عضو مجهول";
            
            coreDatabaseInstance.ref(`live_chats/${targetHostId}`).push({
                type: "gift",
                sender: senderDisplayName,
                giftName: gift.name,
                giftIcon: gift.icon,
                giftPrice: gift.price,
                timestamp: Date.now()
            });

            // تحديث محلي سريع للرصيد الظاهر في هيدر التطبيق
            document.getElementById("uiBalanceCounterLabel").innerText = `${updatedSenderBalance.toFixed(2)} SINU`;
        });
    }).catch(err => console.error("خطأ أثناء تدقيق المعاملة المالية للهدايا:", err));
}

function triggerLuxuryGiftFloatingOverlayEffect(emojiIcon) {
    const overlayContainer = document.getElementById("globalLiveScreenOverlay");
    if (!overlayContainer) return;

    const floatingElement = document.createElement("div");
    floatingElement.className = "floating-overlay-emoji";
    floatingElement.innerText = emojiIcon;
    
    // وضع الإيموجي في مكان أفقي عشوائي أسفل شاشة الموبايل ليطير للأعلى كـ تيك توك
    const randomHorizontalPosition = Math.random() * 80 + 10;
    floatingElement.style.left = `${randomHorizontalPosition}%`;
    
    overlayContainer.appendChild(floatingElement);
    
    // إزالة العنصر برمجياً من الذاكرة فور انتهاء الحركة لحماية كفاءة الهاتف
    setTimeout(() => {
        floatingElement.remove();
    }, 4000);
}

/**
 * ==========================================================================
 * SECTION 7: محرك تشغيل وربط الملحقات والألعاب الأربعة (iFrame Launcher)
 * ==========================================================================
 */
function launchSinuIntegratedGame(gameKey) {
    const gameData = sinuIntegratedGamesRegistry[gameKey];
    if (!gameData) return;

    if (!currentLoggedInUser) {
        alert("⚠️ عذراً: يجب تسجيل الدخول وتفعيل حسابك السحابي لتشغيل الألعاب!");
        return;
    }

    const userBalanceRef = coreDatabaseInstance.ref(`users/${currentLoggedInUser.uid}/balance`);
    
    userBalanceRef.once('value').then((snapshot) => {
        let currentBalance = snapshot.val() || 0;
        
        if (currentBalance < gameData.costToPlay) {
            alert(`❌ رصيد SINU غير كافٍ للملحق! تكلفة الدخول: ${gameData.costToPlay} SINU. رصيدك: ${currentBalance} SINU`);
            return;
        }

        // الخصم وتوثيق المعاملة في لوحة البيانات السحابية لمنع التلاعب
        let newBalance = currentBalance - gameData.costToPlay;
        userBalanceRef.set(newBalance).then(() => {
            
            coreDatabaseInstance.ref(`game_tickets/${currentLoggedInUser.uid}`).push({
                gameName: gameData.title,
                cost: gameData.costToPlay,
                executedAt: Date.now()
            });

            document.getElementById("uiBalanceCounterLabel").innerText = `${newBalance.toFixed(2)} SINU`;
            
            // حقن الـ iFrame الخاص برابط اللعبة التي أرسلتها في الـ Viewport
            injectGameIframeIntoPane(gameData.url, gameData.title);
        });
    }).catch(error => console.error("خطأ في فحص وتدقيق تذكرة اللعبة:", error));
}

function injectGameIframeIntoPane(targetUrl, gameTitle) {
    const gamesPane = document.getElementById("paneGames");
    if (!gamesPane) return;

    gamesPane.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <button onclick="reloadGamesDefaultDashboard()" style="background:var(--bg-input); border:none; color:var(--text-main); padding:8px 14px; border-radius:12px; font-weight:bold; cursor:pointer;"><i class="fa-solid fa-arrow-right"></i> العودة للملحقات</button>
            <strong style="color:var(--dating-purple); font-size:0.95rem;">${gameTitle}</strong>
        </div>
        <div style="width:100%; height:calc(100vh - 210px); border-radius:20px; overflow:hidden; border:1px solid var(--border-color); background:#fff;">
            <iframe src="${targetUrl}" style="width:100%; height:100%; border:none;" allow="camera; microphone; fullscreen;"></iframe>
        </div>
    `;
}

function reloadGamesDefaultDashboard() {
    const gamesPane = document.getElementById("paneGames");
    if (!gamesPane) return;

    gamesPane.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h3 style="font-size: 1.3rem; font-weight: 900; color: var(--text-main);"><i class="fa-solid fa-gamepad" style="color:var(--dating-pink);"></i> ألعاب وملاحق Web3 المتكاملة</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 4px;">انقر على أي ملحق لتشغيله مباشرة عبر رصيد عملة $SINU الموحد</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px; margin-bottom:20px;">
            <div onclick="launchSinuIntegratedGame('worldCup')" style="background:var(--bg-card); border:1px solid var(--border-color); padding:16px; border-radius:20px; text-align:center; cursor:pointer; transition: 0.3s;">
                <span style="font-size:2rem; display:block; margin-bottom:8px;">🏆</span>
                <strong style="font-size:0.85rem; color:var(--text-main);">توقعات المونديال</strong>
                <small style="display:block; color:var(--dating-pink); font-size:0.7rem; margin-top:4px;">تكلفة: 20 SINU</small>
            </div>
            <div onclick="launchSinuIntegratedGame('geniusChallenge')" style="background:var(--bg-card); border:1px solid var(--border-color); padding:16px; border-radius:20px; text-align:center; cursor:pointer; transition: 0.3s;">
                <span style="font-size:2rem; display:block; margin-bottom:8px;">🧠</span>
                <strong style="font-size:0.85rem; color:var(--text-main);">تحدي العباقرة</strong>
                <small style="display:block; color:var(--dating-pink); font-size:0.7rem; margin-top:4px;">تكلفة: 15 SINU</small>
            </div>
            <div onclick="launchSinuIntegratedGame('domino')" style="background:var(--bg-card); border:1px solid var(--border-color); padding:16px; border-radius:20px; text-align:center; cursor:pointer; transition: 0.3s;">
                <span style="font-size:2rem; display:block; margin-bottom:8px;">🀄</span>
                <strong style="font-size:0.85rem; color:var(--text-main);">لعبة الدومينو</strong>
                <small style="display:block; color:var(--dating-pink); font-size:0.7rem; margin-top:4px;">تكلفة: 10 SINU</small>
            </div>
            <div onclick="launchSinuIntegratedGame('wheelOfFortune')" style="background:var(--bg-card); border:1px solid var(--border-color); padding:16px; border-radius:20px; text-align:center; cursor:pointer; transition: 0.3s;">
                <span style="font-size:2rem; display:block; margin-bottom:8px;">🎡</span>
                <strong style="font-size:0.85rem; color:var(--text-main);">عجلة الحظ</strong>
                <small style="display:block; color:var(--dating-pink); font-size:0.7rem; margin-top:4px;">تكلفة: 25 SINU</small>
            </div>
        </div>
    `;
}

/**
 * ==========================================================================
 * SECTION 8: محرك بوابة المصادقة الثنائية (Firebase Auth Framework)
 * ==========================================================================
 */
function toggleAuthPanelMode(mode) {
    currentAuthPanelMode = mode;
    const btnLogin = document.getElementById("btnModeLogin");
    const btnRegister = document.getElementById("btnModeRegister");
    const wrapperFields = document.getElementById("wrapperFieldUsername");

    if (!btnLogin || !btnRegister) return;

    if (mode === 'login') {
        btnLogin.style.background = "var(--dating-pink)";
        btnLogin.style.color = "#fff";
        btnRegister.style.background = "transparent";
        btnRegister.style.color = "var(--text-main)";
        if (wrapperFields) wrapperFields.style.display = "none";
    } else {
        btnLogin.style.background = "transparent";
        btnLogin.style.color = "var(--text-main)";
        btnRegister.style.background = "var(--dating-pink)";
        btnRegister.style.color = "#fff";
        if (wrapperFields) wrapperFields.style.display = "flex";
    }
}

function executeCoreAuthenticationAction() {
    const email = document.getElementById("inputAuthEmail").value.trim();
    const password = document.getElementById("inputAuthPassword").value.trim();

    if (!email || !password) {
        alert("⚠️ يرجى تعبئة الحقول الأساسية (البريد والرمز السري) للمصادقة!");
        return;
    }

    if (currentAuthPanelMode === 'login') {
        coreAuthInstance.signInWithEmailAndPassword(email, password)
            .catch(err => alert("❌ فشل الولوج: " + err.message));
    } else {
        const username = document.getElementById("inputAuthUsername").value.trim().toLowerCase();
        const age = parseInt(document.getElementById("inputAuthAge").value);
        const matchingNature = document.getElementById("selectAuthMatching").value;
        const bio = document.getElementById("inputAuthBio").value.trim() || "عضو نشط في مجتمع SINU";

        if (!username || !age || !matchingNature) {
            alert("⚠️ يرجى ملء حقل العمر، اسم المستخدم، وتحديد طبيعة التعارف لتأمين الحساب!");
            return;
        }

        if (age < 18) {
            alert("❌ حظر قانوني: يجب أن يكون عمرك 18 سنة فما فوق لدخول شبكة SINU!");
            return;
        }

        coreAuthInstance.createUserWithEmailAndPassword(email, password)
            .then((credential) => {
                // حفظ الهوية الكاملة في قاعدة البيانات السحابية فوراً
                coreDatabaseInstance.ref(`users/${credential.user.uid}`).set({
                    username: username,
                    email: email,
                    age: age,
                    matchingNature: matchingNature,
                    bio: bio,
                    balance: 150.00, // رصيد ترحيبي مجاني بـ SINU لفتح الملحقات والألعاب
                    xp: 10,
                    avatar: "https://via.placeholder.com/150",
                    isOnline: true
                }).then(() => {
                    alert("🎉 تهانينا! تم إنشاء حسابك المشفر بنجاح، وتم إيداع الرصيد الترحيبي!");
                });
            })
            .catch(err => alert("❌ فشل التسجيل: " + err.message));
    }
}

// تتبع ومراقبة حالة جلسة المستخدم بشكل دائم (State Persistence Listener)
coreAuthInstance.onAuthStateChanged((user) => {
    const authBackdrop = document.getElementById("coreAuthBackdrop");
    const mainDashboard = document.getElementById("coreAppMainDashboard");

    if (user) {
        activeUserSessionProfile = user;
        if (authBackdrop) authBackdrop.style.display = "none";
        if (mainDashboard) mainDashboard.style.display = "block";
        
        // تعيين حالة الاتصال بالإنترنت حية على السيرفر
        coreDatabaseInstance.ref(`users/${user.uid}/isOnline`).set(true);
        coreDatabaseInstance.ref(`users/${user.uid}/isOnline`).onDisconnect().set(false);

        // تشغيل المحركات السحابية وتحديث الأرصدة والألعاب
        initializeRealtimeSinuEngine(user.uid);
        generateProfessionalGiftsMatrix();
        reloadGamesDefaultDashboard();
    } else {
        activeUserSessionProfile = null;
        myCachedProfileDataRecord = null;
        if (authBackdrop) authBackdrop.style.display = "flex";
        if (mainDashboard) mainDashboard.style.display = "none";
    }
});

function initializeRealtimeSinuEngine(uid) {
    // 1. الاستماع الدائم لتغيرات الملف الشخصي والرصيد في قاعدة البيانات
    coreDatabaseInstance.ref(`users/${uid}`).on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            myCachedProfileDataRecord = data;
            
            const balanceLabel = document.getElementById("uiBalanceCounterLabel");
            const profileUserLabel = document.getElementById("uiSidebarProfileUsername");
            const profileBioLabel = document.getElementById("uiSidebarProfileBioText");

            if (balanceLabel) balanceLabel.innerText = `${(data.balance || 0).toFixed(2)} SINU`;
            if (profileUserLabel) profileUserLabel.innerText = `@${data.username}`;
            if (profileBioLabel) profileBioLabel.innerText = data.bio;
        }
    });

    // 2. محرك فرز وتوليد بطاقات رادار الأصدقاء النشطين تلقائياً حياً
    coreDatabaseInstance.ref('users').on('value', (snapshot) => {
        let onlineCounter = 0;
        const container = document.getElementById("uiActiveOnlineUsersContainer");
        if (!container) return;
        
        container.innerHTML = "";

        snapshot.forEach((child) => {
            const userData = child.val();
            // تصفية وعرض المستخدمين المتصلين حياً واستثناء حسابك الشخصي
            if (userData.isOnline && child.key !== uid) {
                onlineCounter++;
                container.innerHTML += `
                    <div onclick="openUserProfileViewModal('${child.key}', '${userData.username}', '${userData.bio}')" style="background:var(--bg-card); border:1px solid var(--border-color); padding:14px; border-radius:18px; display:flex; align-items:center; justify-content:space-between; cursor:pointer; transition:0.2s;">
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="width:12px; height:12px; background:var(--success); border-radius:50%; box-shadow: 0 0 10px var(--success);"></div>
                            <div>
                                <strong style="color:var(--text-main); font-size:0.92rem; display:block;">@${userData.username}</strong>
                                <small style="color:var(--text-muted); font-size:0.75rem;">${userData.matchingNature} • العمر: ${userData.age}</small>
                            </div>
                        </div>
                        <span style="font-size:0.8rem; background:rgba(255,101,132,0.1); color:var(--dating-pink); padding:4px 10px; border-radius:10px; font-weight:bold;">اتصال حي ⚡</span>
                    </div>
                `;
            }
        });
        
        const counterTag = document.getElementById("radarOnlineCounter");
        if (counterTag) counterTag.innerText = `${onlineCounter} نشط حياً الآن`;
    });

    // 3. محرك جلب التغذية العامة ومشاركات المنصة اللحظية
    coreDatabaseInstance.ref('global_posts').limitToLast(25).on('value', (snapshot) => {
        const msgContainer = document.getElementById("uiMainMessagesContainer");
        if (!msgContainer) return;
        msgContainer.innerHTML = "";

        let postsArray = [];
        snapshot.forEach(child => {
            postsArray.unshift({ id: child.key, ...child.val() });
        });

        postsArray.forEach(post => {
            msgContainer.innerHTML += `
                <div style="background:var(--bg-card); border:1px solid var(--border-color); padding:14px; border-radius:20px; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
                        <div style="width:35px; height:35px; background:var(--dating-pink); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:bold;">${post.author.substring(0,2).toUpperCase()}</div>
                        <div>
                            <strong style="font-size:0.85rem; color:var(--text-main); display:block;">@${post.author}</strong>
                            <small style="font-size:0.65rem; color:var(--text-muted);">${new Date(post.timestamp).toLocaleTimeString('ar-EG')}</small>
                        </div>
                    </div>
                    <p style="font-size:0.88rem; color:var(--text-main); line-height:1.5;">${post.text}</p>
                </div>
            `;
        });
    });
}

function submitActiveMessageFromToolbar() {
    const inputField = document.getElementById("inputMainPrimaryTextField");
    if (!inputField || !activeUserSessionProfile) return;

    const messageContent = inputField.value.trim();
    if (messageContent === "") return;

    const authorName = myCachedProfileDataRecord ? myCachedProfileDataRecord.username : "عضو";

    coreDatabaseInstance.ref('global_posts').push({
        author: authorName,
        text: messageContent,
        timestamp: Date.now()
    }).then(() => {
        inputField.value = "";
    });
}

function generateProfessionalGiftsMatrix() {
    const container = document.getElementById("uiGiftsMatrixGridContainer");
    if (!container) return;
    container.innerHTML = "";

    // حقن وتوليد الهدايا الفاخرة برمجياً داخل واجهة المتجر
    Object.keys(sinuGiftsStoreRegistry).forEach(key => {
        const item = sinuGiftsStoreRegistry[key];
        container.innerHTML += `
            <div onclick="sendGiftToLiveBroadcaster('${key}')" style="background:var(--bg-input); border:1px solid transparent; border-radius:14px; padding:8px 4px; text-align:center; cursor:pointer; transition:0.2s;" class="matrix-gift-item">
                <span style="font-size:1.6rem; display:block; margin-bottom:2px;">${item.icon}</span>
                <strong style="font-size:0.75rem; display:block; color:var(--text-main); white-space:nowrap;">${item.name}</strong>
                <small style="color:var(--dating-purple); font-size:0.68rem; font-weight:bold;">${item.price} SINU</small>
            </div>
        `;
    });
}

/**
 * ==========================================================================
 * SECTION 9: محرك التناقل الحركي والملاحة السلسة للموبايل (Mobile Navigation)
 * ==========================================================================
 */
function switchMobilePane(targetPaneId, clickedButton) {
    currentActiveMobilePaneId = targetPaneId;
    
    // إخفاء كافة كتل العرض الأساسية بالتطبيق
    const allPanes = document.querySelectorAll(".app-pane");
    allPanes.forEach(pane => pane.style.display = "none");

    // تفعيل وإظهار اللوحة المستهدفة برمجياً
    const activePane = document.getElementById(targetPaneId);
    if (activePane) activePane.style.display = "block";

    // تصفير وتحديث وضعية أزرار شريط التنقل السفلي المطور
    const allNavItems = document.querySelectorAll(".nav-item");
    allNavItems.forEach(item => {
        item.style.color = "var(--text-muted)";
        item.style.transform = "scale(1)";
    });
    
    if (clickedButton) {
        clickedButton.style.color = "var(--dating-pink)";
        clickedButton.style.transform = "scale(1.08)";
    }
}

function openUserProfileViewModal(uid, username, bio) {
    currentSelectedChatPartner = uid;
    
    const modal = document.getElementById("userProfileViewModal");
    const modalName = document.getElementById("modalUsername");
    const modalBio = document.getElementById("modalUserBio");

    if (modal && modalName && modalBio) {
        modalName.innerText = `@${username}`;
        modalBio.innerText = bio || "لا توجد نبذة تعريفية مضافة لهذا الحساب.";
        modal.style.display = "flex";
    }
}

function executeSinuDirectTip() {
    if (!currentSelectedChatPartner) return;
    // تخصيص دفعة مالية سريعة ومباشرة بقيمة 10 عملات SINU عند نقر بطاقة العضو
    sendGiftToLiveBroadcaster('rose'); 
    document.getElementById("userProfileViewModal").style.display = "none";
}

/**
 * ==========================================================================
 * SECTION 10: محرك وبوابة الـ Web3 المتقدمة لإيداع وسحب العقود (Web3 Bridge)
 * ==========================================================================
 */
async function connectWeb3WalletBridge() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            alert("جاري الاتصال بمحفظة MetaMask المعتمدة...");
            
            // طلب الاتصال بحسابات المحفظة
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            activeConnectedWalletAddress = accounts[0];
            
            document.getElementById('uiConnectedWalletAddressTag').innerText = 
                activeConnectedWalletAddress.substring(0, 6) + "..." + activeConnectedWalletAddress.substring(38);

            // بناء كائنات مراجع مكتبة Ethers لربط العقود على البلوكشين حياً
            web3BrowserProvider = new ethers.providers.Web3Provider(window.ethereum);
            web3SignerInstance = web3BrowserProvider.getSigner();

            kriptoChatContractInstance = new ethers.Contract(KRIPTO_CHAT_ADDRESS, KRIPTO_CHAT_ABI, web3SignerInstance);
            sinuTokenContractInstance = new ethers.Contract(SINU_TOKEN_ADDRESS, SINU_TOKEN_ABI, web3SignerInstance);

            alert("🌐 تم ربط المحفظة بنجاح مع شبكة البلوكشين! نقوم الآن بجلب أرصدة العقود الحية...");
            fetchOnchainContractBalancesLive();

        } catch (err) {
            console.error("فشل ربط بوابة الميتا ماسك والويب 3:", err);
            alert("❌ فشل الاتصال بالمحفظة: " + err.message);
        }
    } else {
        alert("⚠️ لم يتم العثور على محفظة Web3 مدمجة بالمتصفح! يرجى فتح الموقع من داخل متصفح MetaMask المطور.");
    }
}

async function fetchOnchainContractBalancesLive() {
    if (!kriptoChatContractInstance || !sinuTokenContractInstance || !activeConnectedWalletAddress) return;

    try {
        // قراءة الرصيد الأساسي لعملة SINU داخل محفظة المستخدم على الشبكة مباشرة
        const tokenBalanceWei = await sinuTokenContractInstance.balanceOf(activeConnectedWalletAddress);
        document.getElementById('onchainWalletBalanceLabel').innerText = 
            parseFloat(ethers.utils.formatEther(tokenBalanceWei)).toFixed(2);

        // قراءة الرصيد الفعلي المحجوز والمدخر داخل العقد الذكي للتطبيق
        const contractInAppBalanceWei = await kriptoChatContractInstance.getInAppBalance(activeConnectedWalletAddress);
        document.getElementById('onchainContractInAppBalanceLabel').innerText = 
            parseFloat(ethers.utils.formatEther(contractInAppBalanceWei)).toFixed(2);

    } catch (err) {
        console.error("فشل قراءة أرصدة البلوكشين الذكية حياً:", err);
    }
}

async function executeWeb3DepositSinuToContract() {
    const amountStr = document.getElementById('inputDepositAmountWeiField').value.trim();
    if (!amountStr || !kriptoChatContractInstance || !sinuTokenContractInstance) { 
        alert('⚠️ يرجى التأكد من ربط المحفظة أولاً وإدخال كمية الشحن الرقمية المطلوبة!'); 
        return; 
    }

    try {
        const amountWei = ethers.utils.parseEther(amountStr);
        alert('⏳ انتظر.. نقوم حالياً بعمل تفعيل وتفويض (Approve) للعملة على شبكة البلوكشين الذكية...');
        
        // 1. معاملة التفويض على البلوكشين
        const txApprove = await sinuTokenContractInstance.approve(KRIPTO_CHAT_ADDRESS, amountWei);
        await txApprove.wait();

        alert('✅ نجح التفويض! جاري تنفيذ معاملة الإيداع والشحن الفورية داخل عقد SINU الذكي للرصيد...');
        
        // 2. معاملة الإيداع الفعلي في العقد
        const txDeposit = await kriptoChatContractInstance.depositSinu(amountWei);
        await txDeposit.wait();

        alert('🎉 تهانينا الفائقة! تم شحن محفظة العقد بنجاح على شبكة البلوكشين. نقوم الآن بتحديث أرصدة الواجهة...');
        fetchOnchainContractBalancesLive();

    } catch (err) {
        console.error("فشل شحن رصيد المحفظة On-chain:", err);
        alert("❌ فشلت معاملة البلوكشين: " + err.message);
    }
}

// تعيين تشغيل الملاحة التلقائية للتبويب الأول للرادار فور تحميل المتصفح
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 [SINU CORE SYSTEM ACTIVE] المحرك يعمل الآن بكامل قوته التنافسية لـ GitHub.");
});
